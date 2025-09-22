import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
