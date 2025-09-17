import dotenv from "dotenv";
dotenv.config();

const getRequiredEnvVariables = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export class EnvVariables {
  static get databaseName(): string {
    return getRequiredEnvVariables("MYSQL_DATABASE");
  }

  static get databasePassword(): string {
    return getRequiredEnvVariables("MYSQL_PASSWORD");
  }

  static get databasePort(): number {
    return Number(getRequiredEnvVariables("MYSQL_PORT"));
  }

  static get databaseUrl(): string {
    return getRequiredEnvVariables("MYSQL_URL");
  }
  static get databaseUsername(): string {
    return getRequiredEnvVariables("MYSQL_USERNAME");
  }
  static get databaseShouldSync(): boolean {
    return getRequiredEnvVariables("MYSQL_SHOULD_SYNC") === "true";
  }
}
