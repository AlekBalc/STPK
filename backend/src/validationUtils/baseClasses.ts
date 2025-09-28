import { IsDefined, IsInt, IsPositive, ValidateNested } from "class-validator";

export abstract class BaseRequest {
  body?: object;
  params?: object;
  query?: object;
}

export class GetByIdPathParams {
  @IsDefined({ message: "id is required" })
  @IsPositive({ message: "id must be a positive number" })
  @IsInt({ message: "id must be an integer" })
  id: number;
}
