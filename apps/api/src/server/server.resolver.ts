import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { RconResponse } from "./models/rconResponse";
import { RconClient } from "./rcon.client";
import { subscriptionInterval } from "src/utils/subscriptionIntervalHelper";
import { ServerInfo } from "./models/serverInfo";
import { pubSub } from "src/utils/pubSub";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Command } from "./models/command";

@Resolver()
export class ServerResolver {
  constructor(
    private rconClient: RconClient,
    private eventEmitter: EventEmitter2
  ) {}
  @Mutation(() => Boolean)
  async sendCommand(@Args("command") command: string): Promise<boolean> {
    return true;
  }

  @Subscription(() => RconResponse)
  async log() {
    this.eventEmitter;
    return pubSub.asyncIterator("log");
  }

  @Query(() => ServerInfo)
  async serverInfo(): Promise<ServerInfo> {
    const data = await this.rconClient.getServerInfo();

    return {
      currentPlayers: data.players.length,
      map: data.map,
      name: data.name,
      maxPlayers: data.maxplayers,
    };
  }

  @Query(() => [Command])
  async commands(@Args("search") search: string): Promise<Command[]> {
    this.rconClient.sendCommand(`cvarlist ${search}`);

    const [data] = (await this.eventEmitter.waitFor("cvarlist")) as string[];

    if (data.includes("0 convars/concommands")) {
      return [];
    }

    const list = data
      .replaceAll(/(^cvar list\n--------------\n)|(\n--------------\n.*)/gm, "")
      .split("\n")
      .filter(Boolean)
      .slice(0, 30);

    const output = list.map<Command>((d) => {
      const [command, value, type, ...rest] = d.split(":");

      return {
        command: command.replace(/\s*$/, ""),
        value: value?.replaceAll(/(^\s)|(\s*$)/g, ""),
        description: rest.join("").replace(/^\s/, ""),
      };
    });

    return output;
  }

  @Subscription(() => ServerInfo, { name: "serverInfo" })
  serverInfoSubscription() {
    return subscriptionInterval<ServerInfo>(
      async () => {
        const data = await this.rconClient.getServerInfo();

        return {
          currentPlayers: data.players.length,
          map: data.map,
          name: data.name,
          maxPlayers: data.maxplayers,
        };
      },
      "serverInfo",
      2000
    );
  }
}
