import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

const DATA_FOLDER = join(cwd(), "data");

export class Config {
  name: string;

  rcon_ip: string;

  rcon_port: number;

  rcon_password: string;
}

const EMPTY_CONFIG: Config = {
  name: "",
  rcon_ip: "",
  rcon_password: "",
  rcon_port: 27015,
};

@Injectable()
export class ConfigService implements OnModuleInit {
  private logger: Logger = new Logger(ConfigService.name);

  public async onModuleInit() {
    try {
      await stat(DATA_FOLDER);
      await stat(join(DATA_FOLDER, `config.json`));
    } catch (err) {
      this.logger.debug(
        "Data directory does not exist. Creating initial setup."
      );
      await mkdir(DATA_FOLDER, { recursive: true });

      await writeFile(
        join(DATA_FOLDER, "config.json"),
        JSON.stringify(EMPTY_CONFIG)
      );
    }
  }

  public async getConfig(): Promise<Config> {
    const path = join(DATA_FOLDER, `config.json`);

    const config = JSON.parse(await readFile(path, "utf8")) as Config;

    return config;
  }
}
