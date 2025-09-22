import express from "express";
import {
  deleteTheme,
  getThemeById,
  getThemes,
  patchTheme,
  postTheme,
  putTheme,
} from "./controllers/themes/themes";
import {
  deletePost,
  getPostById,
  getPosts,
  patchPost,
  postPost,
  putPost,
} from "./controllers/posts/posts";

const router = express.Router();

router.post("/themes", postTheme);
router.get("/themes", getThemes);
router.get("/themes/:id", getThemeById);
router.put("/themes/:id", putTheme);
router.patch("/themes/:id", patchTheme);
router.delete("/themes/:id", deleteTheme);

router.post("/posts", postPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", putPost);
router.patch("/posts/:id", patchPost);
router.delete("/posts/:id", deletePost);
export default router;
