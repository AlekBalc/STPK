import { ValidationError } from "class-validator";

export class CustomValidationError extends Error {
  errors: {
    property: string;
    constraints: { [type: string]: string } | undefined;
  }[];
  constructor(message: string, errors: ValidationError[]) {
    super(message);
    console.log(errors);
    this.errors = mapErrors(errors);
  }
}

const mapErrors = (errors: ValidationError[]): any => {
  return errors.map((err: ValidationError) => ({
    property: err.property,
    constraints: err.constraints,
    children:
      err.children && err.children.length > 0
        ? mapErrors(err.children)
        : undefined,
  }));
};

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
