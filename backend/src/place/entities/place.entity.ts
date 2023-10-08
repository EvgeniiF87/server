import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { InterestingCollectionSelectionEntity } from 'src/interesting_collection_selections/entities/interesting_collection_selections.entity';
import { PlaceDirections } from '../directions';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { DefaultFieldsEntity } from 'src/default-fields-entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
@Entity('places')
export class PlaceEntity extends DefaultFieldsEntity {
  @Field({ defaultValue: 'places' })
  @Column({ default: 'places' })
  categry: string;

  @Field(() => PlaceDirections)
  @Column({ type: 'enum', enum: PlaceDirections })
  direction: PlaceDirections;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.places)
  user: UserEntity;

  @Field(() => [ImageEntity])
  @OneToMany(() => ImageEntity, (image) => image.place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: ImageEntity[];

  @Field(() => [InfoEntity])
  @OneToOne(() => InfoEntity, (info) => info.place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  info: InfoEntity[];

  @OneToMany(() => EventPlaceTagEntity, (tag) => tag.place)
  @Field(() => [EventPlaceTagEntity])
  tags: EventPlaceTagEntity[];

  @Field(() => [EventPlaceCostOptionEntity])
  @OneToMany(() => EventPlaceCostOptionEntity, (costOption) => costOption.place)
  costOption: EventPlaceCostOptionEntity[];

  @Field(() => [InterestingCollectionSelectionEntity])
  @OneToMany(
    () => InterestingCollectionSelectionEntity,
    (interesting) => interesting.place,
  )
  interesting: InterestingCollectionSelectionEntity;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
