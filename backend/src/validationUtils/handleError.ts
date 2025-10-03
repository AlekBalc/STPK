import { ValidationError } from "class-validator";
import { Response } from "express";
import {
  CustomValidationError,
  EmptyRequestBodyError,
  NotFoundError,
  PageOutOfRangeError,
} from "./errors";

export const handleError = (error: Error, res: Response) => {
  if (error instanceof CustomValidationError) {
    return res.status(400).json({
      message: error.message,
      errors: error.errors,
    });
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({
      message: error.message,
    });
  }
  if (error instanceof EmptyRequestBodyError) {
    return res.status(422).json({
      message: error.message,
    });
  }
  if (error instanceof PageOutOfRangeError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  console.log(error);
  return res.status(500).json({
    message: "Internal server error",
  });
};
