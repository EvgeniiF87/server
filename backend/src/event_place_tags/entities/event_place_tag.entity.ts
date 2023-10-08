import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('event_place_tags')
export class EventPlaceTagEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventEntity, (event) => event.tags)
  @Field(() => EventEntity)
  event: EventEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => EventEntity)
  @ManyToOne(() => PlaceEntity, (place) => place.tags)
  place: EventEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => TagEntity)
  @ManyToOne(() => TagEntity, (tag) => tag.tags)
  tags: TagEntity;

  @Field(() => Int)
  @Column()
  tagsId: number;
}
