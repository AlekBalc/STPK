import { NextFunction, Request, Response } from "express";

export const invalidJsonHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError) {
    res.status(422).send({ message: "Invalid request body json" });
  } else {
    next();
  }
};
