import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CustomValidationError, EmptyRequestBodyError } from "./errors";
import { Request } from "express";

export const validateRequestBody = async <T extends object>(
  request: Request,
  type: ClassConstructor<T>,
  skipMissingProperties = false
): Promise<T> => {
  if (!request.body || Object.keys(request.body).length === 0) {
    throw new EmptyRequestBodyError("Empty request body");
  }
  const body = plainToInstance(type, request.body);
  const errors = await validate(body, { skipMissingProperties });
  if (errors.length > 0) {
    throw new CustomValidationError("Invalid request body", errors);
  }
  return body;
};

export const validateRequestPathParams = async <T extends object>(
  request: Request,
  type: ClassConstructor<T>
): Promise<T> => {
  const pathParams = plainToInstance(type, request.params, {
    enableImplicitConversion: true,
  });
  const errors = await validate(pathParams);
  if (errors.length > 0) {
    throw new CustomValidationError("Invalid request path parameters", errors);
  }
  return pathParams;
};
