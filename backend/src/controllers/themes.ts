import { Request, Response } from "express";
import { AppDataSource } from "src/data-source";
import { Theme } from "src/entity/Theme";
import { handleError } from "src/validationUtils/handleError";
import { validateRequest } from "src/validationUtils/validateRequest";

const themeRepository = AppDataSource.getRepository(Theme);

export const postTheme = async (req: Request, res: Response) => {
  try {
    const validatedRequest = await validateRequest(req, Theme);

    const result = await themeRepository.insert(validatedRequest.body);
    const insertedId = result.identifiers[0].id;

    res.send({ ...validatedRequest.body, id: insertedId });
  } catch (error: any) {
    handleError(error, res);
  }
};

export const getThemeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const theme = await themeRepository.findOneBy({ id });
    res.send(theme);
  } catch (error: any) {
    handleError(error, res);
  }
};
