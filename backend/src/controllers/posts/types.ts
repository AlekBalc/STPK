import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { BaseRequest } from "src/validationUtils/baseClasses";

export class GetPostByIdPathParams {
  @IsDefined({ message: "id is required" })
  @IsPositive({ message: "id must be a positive number" })
  @IsInt({ message: "id must be an integer" })
  id: number;
}

export class PostPostRequestBody {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;

  @IsNotEmpty({ message: "Theme ID is required" })
  @IsInt({ message: "Theme ID must be an integer" })
  @IsPositive({ message: "Theme ID must be positive" })
  themeId: number;
}

export class PostPostRequest extends BaseRequest {
  @ValidateNested()
  declare body: PostPostRequestBody;
}
