import { Request, Response } from "express";
import { AppDataSource } from "src/data-source";
import { handleError } from "src/validationUtils/handleError";
import {
  validateRequestBody,
  validateRequestPathParams,
} from "src/validationUtils/validateRequest";
import { NotFoundError } from "src/validationUtils/errors";
import { GetPostByIdPathParams } from "./types";
import { Post } from "src/entity/Post";

const postRepository = AppDataSource.getRepository(Post);

export const postPost = async (req: Request, res: Response) => {
  try {
    const validatedRequestBody = await validateRequestBody(req, Post);

    const result = await postRepository.insert(validatedRequestBody);
    const insertedId = result.identifiers[0].id;

    res.status(201).send({
      message: "Post created successfully",
      ...validatedRequestBody,
      id: insertedId,
    });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetPostByIdPathParams
    );
    const post = await postRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    res.send(post);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.find();
    res.send(posts);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const putPost = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetPostByIdPathParams
    );
    const validatedRequestBody = await validateRequestBody(req, Post);

    const post = await postRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const updatedPost = await postRepository.save({
      ...validatedRequestBody,
      id: post.id,
    });
    res.send(updatedPost);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const patchPost = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetPostByIdPathParams
    );
    const validatedRequestBody = await validateRequestBody(req, Post, true);

    const post = await postRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    await postRepository.update(
      { id: validatedPathParams.id },
      validatedRequestBody
    );

    const updatedPostEntity = await postRepository.findOneBy({
      id: validatedPathParams.id,
    });
    res.send(updatedPostEntity);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetPostByIdPathParams
    );

    const post = await postRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const deletedPost = await postRepository.delete({
      id: post.id,
    });
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};
