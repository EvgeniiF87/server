import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceResolver } from './place.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
  providers: [PlaceResolver, PlaceService],
})
export class PlaceModule {}
