import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CustomValidationError } from "./errors";
import { Request, Response } from "express";

export const validateRequest = async <T extends object>(
  request: Request,
  type: ClassConstructor<T>
): Promise<{ body: T }> => {
  const body = plainToInstance(type, request.body);
  const errors = await validate(body);
  if (errors.length > 0) {
    throw new CustomValidationError(errors);
  }
  return { body };
};
