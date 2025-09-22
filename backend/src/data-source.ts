import "reflect-metadata";
import { DataSource } from "typeorm";
import { Theme } from "./entity/Theme";
import { EnvVariables } from "./env-variables";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: EnvVariables.databaseUrl,
  port: EnvVariables.databasePort,
  username: EnvVariables.databaseUsername,
  password: EnvVariables.databasePassword,
  database: EnvVariables.databaseName,
  synchronize: EnvVariables.databaseShouldSync,
  logging: true,
  entities: [Theme, Post, Comment],
  subscribers: [],
  migrations: [],
});
