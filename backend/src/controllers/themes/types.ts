import { IsDefined, IsInt, IsPositive } from "class-validator";

export class GetThemeByIdPathParams {
  @IsDefined({ message: "id is required" })
  @IsPositive({ message: "id must be a positive number" })
  @IsInt({ message: "id must be an integer" })
  id: number;
}
