import { Request, Response } from "express";
import { handleError } from "src/validationUtils/handleError";
import { validateRequest } from "src/validationUtils/validateRequest";
import {
  DeleteThemeRequest,
  GetThemeByIdRequest,
  GetThemesRequest,
  PatchThemeRequest,
  PostThemeRequest,
  PutThemeRequest,
} from "./types";
import { themeRepository } from "./repository";

export const postTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PostThemeRequest);

    const result = await themeRepository.create(validatedRequest.body);

    res.status(201).send({
      message: "Theme created successfully",
      ...result,
    });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getThemeById = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetThemeByIdRequest);
    const theme = await themeRepository.get(validatedRequest.params.id);
    res.send(theme);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getThemes = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, GetThemesRequest);

    const result = await themeRepository.getAll(validatedRequest.query);
    res.send(result);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const putTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, PutThemeRequest);

    const theme = await themeRepository.get(validatedRequest.params.id);
    const updatedTheme = await themeRepository.update(
      theme!.id,
      validatedRequest.body
    );
    res.send(updatedTheme);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const patchTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(
      req,
      PatchThemeRequest,
      true
    );

    const theme = await themeRepository.get(validatedRequest.params.id);
    const updatedThemeEntity = await themeRepository.update(
      theme!.id,
      validatedRequest.body
    );

    res.send(updatedThemeEntity);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const deleteTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, DeleteThemeRequest);

    const theme = await themeRepository.get(validatedRequest.params.id);

    const deletedTheme = await themeRepository.delete(theme!.id);
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};
