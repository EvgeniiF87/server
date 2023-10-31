import { InputType, Field, Int } from '@nestjs/graphql';
import { EventDirections } from '../directions';

@InputType()
export class RequestEvent {
  @Field(() => EventDirections, { nullable: true })
  direction?: EventDirections;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  desc?: string;

  @Field({ nullable: true })
  tag?: string;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
