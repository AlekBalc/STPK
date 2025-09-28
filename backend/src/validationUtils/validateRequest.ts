import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CustomValidationError } from "./errors";
import { Request } from "express";
import { BaseRequest } from "./baseClasses";

export const validateRequest = async <T extends BaseRequest>(
  request: Request,
  type: ClassConstructor<T>,
  skipMissingProperties = false
): Promise<T> => {
  const constructedRequest = plainToInstance(
    type,
    {
      body: request.body,
      params: request.params,
      query: request.query,
    },
    {
      enableImplicitConversion: true,
    }
  );
  const errors = await validate(constructedRequest, { skipMissingProperties });
  if (errors.length > 0) {
    throw new CustomValidationError("Bad request", errors);
  }
  return constructedRequest;
};
