import {
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  Max,
  Min,
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

export class PaginationQueryParams {
  @IsOptional()
  @IsInt({ message: "page must be an integer" })
  @IsPositive({ message: "page must be a positive number" })
  page?: number;

  @IsOptional()
  @IsInt({ message: "pageSize must be an integer" })
  @IsPositive({ message: "pageSize must be a positive number" })
  @Min(1, { message: "pageSize must be at least 1" })
  @Max(100, { message: "pageSize cannot exceed 100" })
  pageSize?: number;
}

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
