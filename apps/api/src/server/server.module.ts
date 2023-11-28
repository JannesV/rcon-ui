import { Module } from "@nestjs/common";
import { RconClient } from "./rcon.client";
import { ServerResolver } from "./server.resolver";

@Module({
  providers: [RconClient, ServerResolver],
})
export class ServerModule {}
