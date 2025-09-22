import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, IsEmpty } from "class-validator";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  @IsEmpty({ message: "ID should not be provided" })
  id: number;

  @Column({ length: 100 })
  @IsDefined({ message: "Title is required" })
  title: string;
}
