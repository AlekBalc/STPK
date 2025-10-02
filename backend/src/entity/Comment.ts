import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: "content is required" })
  @IsString({ message: "Content must be a string" })
  @Length(1, 100, { message: "Content must be between 1 and 100 characters" })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "postId" })
  post: Post;
}
