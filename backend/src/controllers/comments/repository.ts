import { AppDataSource } from "src/data-source";
import { Comment } from "src/entity/Comment";
import { NotFoundError } from "src/validationUtils/errors";
import { Repository } from "typeorm";
import { FullPostCommentRequestBody } from "./types";

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

  async getAll(): Promise<Comment[]> {
    return await this.repository.find();
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
