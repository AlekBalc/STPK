import express from "express";
import {
  deleteTheme,
  getThemeById,
  getThemes,
  patchTheme,
  postTheme,
  putTheme,
} from "./controllers/themes/themes";

const router = express.Router();

router.post("/themes", postTheme);
router.get("/themes", getThemes);
router.get("/themes/:id", getThemeById);
router.put("/themes/:id", putTheme);
router.patch("/themes/:id", patchTheme);
router.delete("/themes/:id", deleteTheme);

export default router;
