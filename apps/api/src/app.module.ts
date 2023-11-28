import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { join } from "path";
import { ConfigModule } from "./configs/config.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ScheduleModule } from "@nestjs/schedule";
import { ServerModule } from "./server/server.module";

@Module({
  imports: [
    ConfigModule,
    ServerModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true,
      playground: true,
      subscriptions: {
        "graphql-ws": true,
        "subscriptions-transport-ws": true,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: "./web",
    }),
  ],
})
export class AppModule {}
