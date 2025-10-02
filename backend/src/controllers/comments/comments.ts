import { Request, Response } from "express";
import { handleError } from "src/validationUtils/handleError";
import { commentRepository } from "./repository";
import { validateRequest } from "src/validationUtils/validateRequest";
import {
  DeleteCommentRequest,
  GetCommentByIdRequest,
  PatchCommentRequest,
  PostCommentRequest,
  PutCommentRequest,
} from "./types";

export const postComment = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PostCommentRequest);

    const result = await commentRepository.create(validatedRequest.body);

    res.status(201).send({
      message: "Comment created successfully",
      ...result,
    });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetCommentByIdRequest);
    const comment = await commentRepository.get(validatedRequest.params.id);
    res.send(comment);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentRepository.getAll();
    res.send(comments);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const putComment = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PutCommentRequest);

    const comment = await commentRepository.get(validatedRequest.params.id);
    const updatedComment = await commentRepository.update(
      comment!.id,
      validatedRequest.body
    );
    res.send(updatedComment);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const patchComment = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(
      req,
      PatchCommentRequest,
      true
    );

    const comment = await commentRepository.get(validatedRequest.params.id);
    const updatedCommentEntity = await commentRepository.update(
      comment!.id,
      validatedRequest.body
    );

    res.send(updatedCommentEntity);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, DeleteCommentRequest);

    const comment = await commentRepository.get(validatedRequest.params.id);

    const deletedComment = await commentRepository.delete(comment!.id);
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};
