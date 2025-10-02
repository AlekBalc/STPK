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
} from "src/validationUtils/baseClasses";

export class PostCommentRequestBody {
  @IsNotEmpty({ message: "Content is required" })
  @IsString({ message: "Content must be a string" })
  @Length(1, 100, { message: "Content must be between 1 and 100 characters" })
  content: string;
}

export class FullPostCommentRequestBody extends PostCommentRequestBody {
  @IsNotEmpty({ message: "Post ID is required" })
  @IsInt({ message: "Post ID must be an integer" })
  @IsPositive({ message: "Post ID must be positive" })
  postId: number;
}

export class PostCommentRequest extends BaseRequest {
  @ValidateNested()
  declare body: FullPostCommentRequestBody;
}

export class PutCommentRequest extends BaseRequest {
  @ValidateNested()
  declare body: PostCommentRequestBody;
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class PatchCommentRequest extends BaseRequest {
  @ValidateNested()
  declare body: PostCommentRequestBody;
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class GetCommentByIdRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class DeleteCommentRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}
