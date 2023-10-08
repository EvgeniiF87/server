import { Injectable } from '@nestjs/common';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { Repository } from 'typeorm';
import { PlaceDirections } from './directions';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly PlaceRepository: Repository<PlaceEntity>,
  ) {}

  async getCount() {
    return await this.PlaceRepository.count();
  }

  async create(createPlaceInput: CreatePlaceInput) {
    return await this.PlaceRepository.save({ ...createPlaceInput });
  }

  async findAll(direction?: PlaceDirections, take?: number, skip?: number) {
    return await this.PlaceRepository.find({
      where: { direction: direction },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
      take: take,
      skip: skip,
    });
  }

  async findAllUserPaces(id: number) {
    return await this.PlaceRepository.find({
      where: {
        userId: id,
      },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async findOne(id: number) {
    return await this.PlaceRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async update(id: number, updatePlaceInput: UpdatePlaceInput) {
    return await this.PlaceRepository.update({ id }, { ...updatePlaceInput });
  }

  async updateViews(id: number) {
    const place = await this.PlaceRepository.findOneBy({ id });
    return await this.PlaceRepository.update(
      { id },
      { views: place.views + 1 },
    );
  }

  async publish(id: number) {
    return await this.PlaceRepository.update({ id }, { publish: true });
  }

  async remove(id: number) {
    const isExist = await this.PlaceRepository.findOneBy({ id });

    if (!isExist)
      return { message: `место с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.PlaceRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `место с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return { message: `место с id: ${id} не удалёно`, status: 'error' };
      }
    }
  }
}
