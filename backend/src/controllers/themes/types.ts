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

export class ThemeRequestBody {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
  title: string;

  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  @Length(1, 300, {
    message: "Description must be between 1 and 300 characters",
  })
  description: string;
}

export class DeleteThemeRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}

export class PatchThemeRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
  @ValidateNested()
  declare body: ThemeRequestBody;
}

export class PutThemeRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
  @ValidateNested()
  declare body: ThemeRequestBody;
}

export class PostThemeRequest extends BaseRequest {
  @ValidateNested()
  declare body: ThemeRequestBody;
}

export class GetThemeByIdRequest extends BaseRequest {
  @ValidateNested()
  declare params: GetByIdPathParams;
}
