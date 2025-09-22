import { ValidationError } from "class-validator";

export class CustomValidationError extends Error {
  errors: {
    property: string;
    constraints: { [type: string]: string } | undefined;
  }[];
  constructor(errors: ValidationError[]) {
    super("Validation error");
    this.errors = errors.map((err: ValidationError) => ({
      property: err.property,
      constraints: err.constraints,
    }));
  }
}
