import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty, IsEmpty, IsString, Length } from "class-validator";
import { Post } from "./Post";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  @IsEmpty({ message: "ID should not be provided" })
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;

  @Column({ length: 300 })
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  @Length(1, 300, {
    message: "Description must be between 1 and 300 characters",
  })
  description: string;

  @OneToMany(() => Post, (post) => post.theme)
  posts: Post[];
}
