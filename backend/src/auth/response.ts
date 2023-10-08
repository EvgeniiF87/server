import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Tokens {
  @Field()
  token: string;

  @Field(() => Int)
  userId: number;

  @Field()
  role: string;
}
