import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInterestingCollectionSelectionInput {
  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  interestingId: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  eventId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: 'поле должно быть целым числом' })
  @IsNotEmpty({ message: 'поле не должно быть пустым' })
  placeId?: number;
}
