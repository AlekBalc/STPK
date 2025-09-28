// import { Request, Response } from "express";
// import { handleError } from "src/validationUtils/handleError";
// import {
//   validateRequestBody,
//   validateRequestPathParams,
// } from "src/validationUtils/validateRequest";
// import { GetPostByIdPathParams } from "./types";
// import { postRepository } from "./repository";
// import { Post } from "src/entity/Post";

// export const postPost = async (req: Request, res: Response) => {
//   try {
//     const validatedRequestBody = await validateRequestBody(req, Post);

//     const result = await postRepository.create(validatedRequestBody);

//     res.status(201).send({
//       message: "Post created successfully",
//       ...result,
//     });
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };

// export const getPostById = async (req: Request, res: Response) => {
//   try {
//     const validatedPathParams = await validateRequestPathParams(
//       req,
//       GetPostByIdPathParams
//     );
//     const post = await postRepository.get(validatedPathParams.id);
//     res.send(post);
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };

// export const getPosts = async (req: Request, res: Response) => {
//   try {
//     const posts = await postRepository.getAll();
//     res.send(posts);
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };

// export const putPost = async (req: Request, res: Response) => {
//   try {
//     const validatedPathParams = await validateRequestPathParams(
//       req,
//       GetPostByIdPathParams
//     );
//     const validatedRequestBody = await validateRequestBody(req, Post);

//     const post = await postRepository.get(validatedPathParams.id);
//     const updatedPost = await postRepository.update(
//       post!.id,
//       validatedRequestBody
//     );
//     res.send(updatedPost);
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };

// export const patchPost = async (req: Request, res: Response) => {
//   try {
//     const validatedPathParams = await validateRequestPathParams(
//       req,
//       GetPostByIdPathParams
//     );
//     const validatedRequestBody = await validateRequestBody(req, Post, true);

//     const post = await postRepository.get(validatedPathParams.id);
//     const updatedPostEntity = await postRepository.update(
//       post!.id,
//       validatedRequestBody
//     );

//     res.send(updatedPostEntity);
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };

// export const deletePost = async (req: Request, res: Response) => {
//   try {
//     const validatedPathParams = await validateRequestPathParams(
//       req,
//       GetPostByIdPathParams
//     );

//     const post = await postRepository.get(validatedPathParams.id);

//     const deletedPost = await postRepository.delete(post!.id);
//     res.status(204).send();
//   } catch (error: any) {
//     handleError(error, res);
//   }
// };
