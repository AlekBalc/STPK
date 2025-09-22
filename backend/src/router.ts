import express, { Response, Request } from "express";
import { AppDataSource } from "./data-source";
import { Theme } from "./entity/Theme";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";

const router = express.Router();
const themeRepository = AppDataSource.getRepository(Theme);
const postRepository = AppDataSource.getRepository(Post);
const commentRepository = AppDataSource.getRepository(Comment);

router.post("/themes", async (req: Request, res: Response) => {
  const body: Theme = req.body;
  console.log(body);
  const result = await themeRepository.insert(body);
  const insertedId = result.identifiers[0].id;
  console.log(result);
  res.send({ ...body, id: insertedId });
});

router.get("/themes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log(id);
  const theme = await themeRepository.findOneBy({ id });
  res.send(theme);
});

export default router;
