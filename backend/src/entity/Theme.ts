import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsEmpty, IsString, Length } from "class-validator";

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
}
