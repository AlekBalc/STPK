import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
