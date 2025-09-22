import { AppDataSource } from "src/data-source";
import { Post } from "src/entity/Post";
import { NotFoundError } from "src/validationUtils/errors";
import { Repository } from "typeorm";
import { themeRepository } from "../themes/repository";

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

  async create(postData: Partial<Post>): Promise<Post> {
    const theme = await themeRepository.get(postData.themeId!);
    const result = await this.repository.insert({ ...postData, theme: theme! });
    const insertedId = result.identifiers[0].id;
    return (await this.get(insertedId)) as Post;
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
