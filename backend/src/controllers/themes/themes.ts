import { Request, Response } from "express";
import { AppDataSource } from "src/data-source";
import { Theme } from "src/entity/Theme";
import { handleError } from "src/validationUtils/handleError";
import {
  validateRequestBody,
  validateRequestPathParams,
} from "src/validationUtils/validateRequest";
import { GetThemeByIdPathParams } from "./types";
import { NotFoundError } from "src/validationUtils/errors";

const themeRepository = AppDataSource.getRepository(Theme);

export const postTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequestBody = await validateRequestBody(req, Theme);

    const result = await themeRepository.insert(validatedRequestBody);
    const insertedId = result.identifiers[0].id;

    res.status(201).send({
      message: "Theme created successfully",
      ...validatedRequestBody,
      id: insertedId,
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
    const theme = await themeRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!theme) {
      throw new NotFoundError("Theme not found");
    }
    res.send(theme);
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getThemes = async (req: Request, res: Response) => {
  try {
    const themes = await themeRepository.find();
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

    const theme = await themeRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!theme) {
      throw new NotFoundError("Theme not found");
    }
    const updatedTheme = await themeRepository.save({
      ...validatedRequestBody,
      id: theme.id,
    });
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

    const theme = await themeRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!theme) {
      throw new NotFoundError("Theme not found");
    }
    await themeRepository.update(
      { id: validatedPathParams.id },
      validatedRequestBody
    );

    const updatedThemeEntity = await themeRepository.findOneBy({
      id: validatedPathParams.id,
    });
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

    const theme = await themeRepository.findOneBy({
      id: validatedPathParams.id,
    });
    if (!theme) {
      throw new NotFoundError("Theme not found");
    }

    const deletedTheme = await themeRepository.delete({
      id: theme.id,
    });
    res.status(204).send();
  } catch (error: any) {
    handleError(error, res);
  }
};
