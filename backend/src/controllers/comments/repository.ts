import { AppDataSource } from "src/data-source";
import { Comment } from "src/entity/Comment";
import { NotFoundError, PageOutOfRangeError } from "src/validationUtils/errors";
import { Repository } from "typeorm";
import { FullPostCommentRequestBody } from "./types";
import { DEFAULT_PAGE_SIZE } from "src/constants";
import {
  Pagination,
  PaginationQueryParams,
} from "src/validationUtils/baseClasses";

class CommentRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = AppDataSource.getRepository(Comment);
  }

  async get(id: number): Promise<Comment | null> {
    const comment = await this.repository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    return comment;
  }

  async getAll(pagination: PaginationQueryParams): Promise<{
    comments: Comment[];
    pagination: Pagination;
  }> {
    const currentPage = pagination.page || 1;
    const currentPageSize = pagination.pageSize || DEFAULT_PAGE_SIZE;
    const skip = (currentPage - 1) * currentPageSize;

    const [comments] = await this.repository.findAndCount({
      skip: skip,
      take: currentPageSize,
    });

    const total = await this.repository.count();
    const totalPages = Math.ceil(total / currentPageSize) || 1;
    if (comments.length === 0 && total > 0) {
      throw new PageOutOfRangeError(currentPage, totalPages);
    }

    return {
      comments,
      pagination: {
        total,
        page: currentPage,
        pageSize: currentPageSize,
        totalPages,
      },
    };
  }

  async create(commentData: FullPostCommentRequestBody): Promise<Comment> {
    const comment = this.repository.create({
      content: commentData.content,
      post: { id: commentData.postId },
    });

    try {
      return await this.repository.save(comment);
    } catch (error: any) {
      if (error.code === "ER_NO_REFERENCED_ROW_2" || error.code === "23503") {
        throw new NotFoundError("Post not found");
      }
      throw error;
    }
  }

  async update(
    id: number,
    commentData: Partial<Comment>
  ): Promise<Comment | null> {
    await this.repository.update({ id }, commentData);
    return await this.get(id);
  }

  async patch(
    id: number,
    commentData: Partial<Comment>
  ): Promise<Comment | null> {
    const existingComment = await this.get(id);
    if (!existingComment) {
      return null;
    }

    const updatedComment = await this.repository.save({
      ...existingComment,
      ...commentData,
    });
    return updatedComment;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return (result.affected ?? 0) > 0;
  }
}

export const commentRepository = new CommentRepository();
