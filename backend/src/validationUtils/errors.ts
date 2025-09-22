import { ValidationError } from "class-validator";

export class CustomValidationError extends Error {
  errors: {
    property: string;
    constraints: { [type: string]: string } | undefined;
  }[];
  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors.map((err: ValidationError) => ({
      property: err.property,
      constraints: err.constraints,
    }));
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class EmptyRequestBodyError extends Error {
  constructor(message: string) {
    super(message);
  }
}
