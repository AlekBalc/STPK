import { Request, Response } from "express";
import { handleError } from "src/validationUtils/handleError";
import { postRepository } from "./repository";

import { validateRequest } from "src/validationUtils/validateRequest";
import {
  DeletePostRequest,
  GetCommentByPostRequest,
  GetPostByIdRequest,
  GetPostsRequest,
  PatchPostRequest,
  PostPostRequest,
  PutPostRequest,
} from "./types";

export const postPost = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PostPostRequest);

    const result = await postRepository.create(validatedRequest.body);

    res.status(201).send({
      message: "Post created successfully",
      ...result,
    });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetPostByIdRequest);
    const post = await postRepository.get(validatedRequest.params.id);
    res.send(post);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetPostsRequest);

    const result = await postRepository.getAll(validatedRequest.query);
    res.send(result);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const putPost = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PutPostRequest);

    const post = await postRepository.get(validatedRequest.params.id);
    const updatedPost = await postRepository.update(
      post!.id,
      validatedRequest.body
    );
    res.send(updatedPost);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const patchPost = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PatchPostRequest, true);

    const post = await postRepository.get(validatedRequest.params.id);
    const updatedPostEntity = await postRepository.update(
      post!.id,
      validatedRequest.body
    );

    res.send(updatedPostEntity);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, DeletePostRequest);

    const post = await postRepository.get(validatedRequest.params.id);

    const deletedPost = await postRepository.delete(post!.id);
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetCommentByPostRequest);
    const post = await postRepository.getPostComments(validatedRequest.params.id);
    res.send(post);
  } catch (error: any) {
    handleError(error, res);
  }
};