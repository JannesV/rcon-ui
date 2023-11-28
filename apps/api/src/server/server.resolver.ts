import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { RconResponse } from "./models/rconResponse";
import { RconClient } from "./rcon.client";
import { subscriptionInterval } from "src/utils/subscriptionIntervalHelper";
import { ServerInfo } from "./models/serverInfo";
import { pubSub } from "src/utils/pubSub";

@Resolver()
export class ServerResolver {
  constructor(private rconClient: RconClient) {}
  @Mutation(() => RconResponse)
  async sendCommand(@Args("command") command: string): Promise<RconResponse> {
    this.rconClient.sendCommand(command);
    return {
      text: "",
    };
  }

  @Subscription(() => RconResponse)
  async log() {
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
