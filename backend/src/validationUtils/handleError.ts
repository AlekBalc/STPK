import { ValidationError } from "class-validator";
import { Response } from "express";
import { CustomValidationError } from "./errors";

export const handleError = (error: Error, res: Response) => {
  if (error instanceof CustomValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
