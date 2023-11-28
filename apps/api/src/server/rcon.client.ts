import { Injectable, OnModuleInit } from "@nestjs/common";
import Rcon from "rcon-srcds";
import Gamedig from "gamedig";

import { decode } from "rcon-srcds/dist/packet";

import {} from "rc";
import { GameDigResponse } from "src/types/gamedig";
import { pubSub } from "src/utils/pubSub";
import { ConfigService } from "src/configs/config.service";

@Injectable()
export class RconClient implements OnModuleInit {
  private client: Rcon;

  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    try {
      const { rcon_ip, rcon_password, rcon_port } =
        await this.configService.getConfig();

      this.client = new Rcon({
        host: rcon_ip,
        port: rcon_port,
      });

      await this.client.authenticate(rcon_password);

      this.client.connection.on("data", (data) => {
        pubSub.publish("log", { log: { text: decode(data).body } });
      });
    } catch (err) {
      throw new Error("Error connecting to RCON Service");
    }
  }

  public async sendCommand(command: string) {
    return this.client.execute(command);
  }

  getServerInfo(): Promise<GameDigResponse> {
    console.log(this.client.host);
    return Gamedig.query({
      type: "csgo",
      host: "192.168.1.200",
    });
  }
}
