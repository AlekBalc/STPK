import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Comment } from "./Comment";
import {
  IsNotEmpty,
  IsString,
  Length,
  IsInt,
  IsPositive,
} from "class-validator";
import { Theme } from "./Theme";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "Theme ID is required" })
  @IsInt({ message: "Theme ID must be an integer" })
  @IsPositive({ message: "Theme ID must be positive" })
  themeId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Theme, (theme) => theme.posts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "themeId" })
  theme: Theme;
}
