import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import router from "./router";
import { invalidJsonHandler } from "./middleware/invalid-json-handler";
import { setupSwagger } from "./swagger";
import { emptyBodyHandler } from "./middleware/empty-json-handler";
dotenv.config();

(function () {
  try {
    AppDataSource.initialize();
  } catch (error) {
    console.error(error);
  }
})();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(invalidJsonHandler);
app.use(emptyBodyHandler);
setupSwagger(app);

app.use("/api", router);
app.all("*", (req, res) => {
  res.status(404).send({ message: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
