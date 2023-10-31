import { InputType, Field, Int } from '@nestjs/graphql';
import { PlaceDirections } from '../directions';

@InputType()
export class RequestPlace {
  @Field(() => PlaceDirections, { nullable: true })
  direction?: PlaceDirections;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
