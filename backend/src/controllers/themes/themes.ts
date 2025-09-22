import { Request, Response } from "express";
import { AppDataSource } from "src/data-source";
import { Theme } from "src/entity/Theme";
import { handleError } from "src/validationUtils/handleError";
import {
  validateRequestBody,
  validateRequestPathParams,
} from "src/validationUtils/validateRequest";
import { GetThemeByIdPathParams } from "./types";
import { themeRepository } from "./repository";

export const postTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequestBody = await validateRequestBody(req, Theme);

    const result = await themeRepository.create(validatedRequestBody);

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
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetThemeByIdPathParams
    );
    const theme = await themeRepository.get(validatedPathParams.id);
    res.send(theme);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await themeRepository.getAll();
    res.send(themes);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const putTheme = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetThemeByIdPathParams
    );
    const validatedRequestBody = await validateRequestBody(req, Theme);

    const theme = await themeRepository.get(validatedPathParams.id);
    const updatedTheme = await themeRepository.update(
      theme!.id,
      validatedRequestBody
    );
    res.send(updatedTheme);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const patchTheme = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetThemeByIdPathParams
    );
    const validatedRequestBody = await validateRequestBody(req, Theme, true);

    const theme = await themeRepository.get(validatedPathParams.id);
    const updatedThemeEntity = await themeRepository.update(
      theme!.id,
      validatedRequestBody
    );

    res.send(updatedThemeEntity);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const deleteTheme = async (req: Request, res: Response) => {
  try {
    const validatedPathParams = await validateRequestPathParams(
      req,
      GetThemeByIdPathParams
    );

    const theme = await themeRepository.get(validatedPathParams.id);

    const deletedTheme = await themeRepository.delete(theme!.id);
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};
