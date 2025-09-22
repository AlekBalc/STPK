import express from "express";
import { AppDataSource } from "./data-source";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
import { getThemeById, postTheme } from "./controllers/themes";

const router = express.Router();

const postRepository = AppDataSource.getRepository(Post);
const commentRepository = AppDataSource.getRepository(Comment);

router.post("/themes", postTheme);
router.get("/themes/:id", getThemeById);

export default router;
