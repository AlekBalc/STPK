import {
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateNested,
} from "class-validator";

export abstract class BaseRequest {
  @IsOptional()
  body?: object;
  @IsOptional()
  params?: object;
  @IsOptional()
  query?: object;
}

export class GetByIdPathParams {
  @IsDefined({ message: "id is required" })
  @IsPositive({ message: "id must be a positive number" })
  @IsInt({ message: "id must be an integer" })
  id: number;
}
