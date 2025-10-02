import { Request, Response, NextFunction } from "express";

export const emptyBodyHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodsToCheck = ["POST", "PUT", "PATCH"];

  if (methodsToCheck.includes(req.method)) {
    // Check if body is undefined, null, empty object, or empty string
    if (
      !req.body ||
      (typeof req.body === "object" && Object.keys(req.body).length === 0) ||
      (typeof req.body === "string" && req.body.trim() === "")
    ) {
      return res.status(422).json({ message: "Empty request body" });
    }
  }

  next();
};
