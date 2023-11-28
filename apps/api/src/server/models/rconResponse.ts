import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RconResponse {
  @Field()
  text: string;
}
