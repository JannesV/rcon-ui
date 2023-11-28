import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ServerInfo {
  @Field()
  name: string;
  @Field()
  map: string;
  @Field()
  maxPlayers: number;
  @Field()
  currentPlayers: number;
}
