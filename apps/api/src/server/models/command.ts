import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Command {
  @Field()
  command: string;

  @Field({ nullable: true })
  value?: string;

  @Field({ nullable: true })
  description?: string;
}
