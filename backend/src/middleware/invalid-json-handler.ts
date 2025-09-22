import { Request, Response } from "express";

export const invalidJsonHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: Function
) => {
  if (error instanceof SyntaxError) {
    res.status(422).send({ message: "Invalid JSON" });
  } else {
    next();
  }
};
