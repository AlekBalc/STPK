import { AppDataSource } from "src/data-source";
import { Post } from "src/entity/Post";
import { NotFoundError } from "src/validationUtils/errors";
import { Repository } from "typeorm";
import { FullPostPostRequestBody } from "./types";

class PostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = AppDataSource.getRepository(Post);
  }

  async get(id: number): Promise<Post | null> {
    const post = await this.repository.findOneBy({ id });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  }

  async getAll(): Promise<Post[]> {
    return await this.repository.find();
  }

  async create(postData: FullPostPostRequestBody): Promise<Post> {
    const post = this.repository.create({
      title: postData.title,
      theme: { id: postData.themeId },
    });

    try {
      return await this.repository.save(post);
    } catch (error: any) {
      if (error.code === "ER_NO_REFERENCED_ROW_2" || error.code === "23503") {
        throw new NotFoundError("Theme not found");
      }
      throw error;
    }
  }

  async update(id: number, postData: Partial<Post>): Promise<Post | null> {
    await this.repository.update({ id }, postData);
    return await this.get(id);
  }

  async patch(id: number, postData: Partial<Post>): Promise<Post | null> {
    const existingPost = await this.get(id);
    if (!existingPost) {
      return null;
    }

    const updatedPost = await this.repository.save({
      ...existingPost,
      ...postData,
    });
    return updatedPost;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return (result.affected ?? 0) > 0;
  }
}

export const postRepository = new PostRepository();
