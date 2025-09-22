import { AppDataSource } from "src/data-source";
import { Theme } from "src/entity/Theme";
import { NotFoundError } from "src/validationUtils/errors";
import { Repository } from "typeorm";

class ThemeRepository {
  private repository: Repository<Theme>;

  constructor() {
    this.repository = AppDataSource.getRepository(Theme);
  }

  async get(id: number): Promise<Theme | null> {
    const theme = await this.repository.findOneBy({ id });
    if (!theme) {
      throw new NotFoundError("Theme not found");
    }
    return theme;
  }

  async getAll(): Promise<Theme[]> {
    return await this.repository.find();
  }

  async create(themeData: Partial<Theme>): Promise<Theme> {
    const result = await this.repository.insert(themeData);
    const insertedId = result.identifiers[0].id;
    return (await this.get(insertedId)) as Theme;
  }

  async update(id: number, themeData: Partial<Theme>): Promise<Theme | null> {
    await this.repository.update({ id }, themeData);
    return await this.get(id);
  }

  async patch(id: number, themeData: Partial<Theme>): Promise<Theme | null> {
    const existingTheme = await this.get(id);
    if (!existingTheme) {
      return null;
    }

    const updatedTheme = await this.repository.save({
      ...existingTheme,
      ...themeData,
    });
    return updatedTheme;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return (result.affected ?? 0) > 0;
  }
}

export const themeRepository = new ThemeRepository();
