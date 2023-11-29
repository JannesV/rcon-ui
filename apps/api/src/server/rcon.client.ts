import { Injectable, OnModuleInit } from "@nestjs/common";
import Rcon from "rcon-srcds";
import Gamedig from "gamedig";

import { decode } from "rcon-srcds/dist/packet";

import {} from "rc";
import { GameDigResponse } from "src/types/gamedig";
import { pubSub } from "src/utils/pubSub";
import { ConfigService } from "src/configs/config.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class RconClient implements OnModuleInit {
  private client: Rcon;

  constructor(
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {}
  async onModuleInit() {
    try {
      const { rcon_ip, rcon_password, rcon_port } =
        await this.configService.getConfig();

      this.client = new Rcon({
        host: rcon_ip,
        port: rcon_port,
      });

      await this.client.authenticate(rcon_password);

      let oldText = "";

      this.client.connection.on("data", (data) => {
        const text = decode(data).body;

        if (text.startsWith("cvar list")) {
          oldText += text;
        }

        if (
          text.includes("total convars/concommands") ||
          text.includes("convars/concommands for [")
        ) {
          if (!text.startsWith("cvar list")) {
            oldText += text;
          }
          this.eventEmitter.emit("cvarlist", oldText);
          oldText = "";
        } else if (oldText) {
          oldText += text;
        } else if (!oldText) {
          pubSub.publish("log", { log: { text } });
        }
      });
    } catch (err) {
      throw new Error("Error connecting to RCON Service");
    }
  }

  public async sendCommand(command: string) {
    return (await this.client.execute(command)).toString();
  }

  getServerInfo(): Promise<GameDigResponse> {
    return Gamedig.query({
      type: "csgo",
      host: this.client.host,
    });
  }
}
