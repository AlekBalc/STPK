import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import {
  BaseRequest,
  GetByIdPathParams,
  PaginationQueryParams,
} from "src/validationUtils/baseClasses";

export class PostPostRequestBody {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;
}

export class FullPostPostRequestBody extends PostPostRequestBody {
  @IsNotEmpty({ message: "Theme ID is required" })
  @IsInt({ message: "Theme ID must be an integer" })
  @IsPositive({ message: "Theme ID must be positive" })
  themeId: number;
}

export class PostPostRequest extends BaseRequest {
  @ValidateNested()
  declare body: FullPostPostRequestBody;
}

export class PutPostRequest extends BaseRequest {
  @ValidateNested()
  declare body: PostPostRequestBody;
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class PatchPostRequest extends BaseRequest {
  @ValidateNested()
  declare body: PostPostRequestBody;
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class GetPostByIdRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class GetCommentByPostRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class GetPostsRequest extends BaseRequest {
  @ValidateNested()
  declare query: PaginationQueryParams;
}

export class DeletePostRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}
