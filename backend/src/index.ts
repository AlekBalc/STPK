import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
dotenv.config();

try {
  await AppDataSource.initialize();
} catch (error) {
  console.error(error);
}

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
