import "reflect-metadata";
import { DataSource } from "typeorm";
import { Theme } from "./entity/Theme.js";
import { EnvVariables } from "./env-variables.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: EnvVariables.databaseUrl,
  port: EnvVariables.databasePort,
  username: EnvVariables.databaseUsername,
  password: EnvVariables.databasePassword,
  database: EnvVariables.databaseName,
  synchronize: EnvVariables.databaseShouldSync,
  logging: true,
  entities: [Theme],
  subscribers: [],
  migrations: [],
});
