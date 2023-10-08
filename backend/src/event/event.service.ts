import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { Repository } from 'typeorm';
import { EventDirections } from './directions';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
  ) {}

  async getCount() {
    return await this.EventRepository.count();
  }

  async create(createEventInput: CreateEventInput) {
    return await this.EventRepository.save({ ...createEventInput });
  }

  async findAll(direction?: EventDirections, take?: number, skip?: number) {
    return await this.EventRepository.find({
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

  async findAllUserEvents(id: number) {
    return await this.EventRepository.find({
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
    return await this.EventRepository.findOne({
      where: { id },
      relations: {
        images: true,
        info: true,
        tags: { tags: true },
        costOption: { costOption: true },
      },
    });
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    return await this.EventRepository.update({ id }, { ...updateEventInput });
  }

  async updateViews(id: number) {
    const event = await this.EventRepository.findOneBy({ id });
    return await this.EventRepository.update(
      { id },
      { views: event.views + 1 },
    );
  }

  async publish(id: number) {
    return await this.EventRepository.update({ id }, { publish: true });
  }

  async remove(id: number) {
    const isExist = await this.EventRepository.findOneBy({ id });

    if (!isExist)
      return { message: `событие с id: ${id} не найдено`, status: 'error' };

    if (isExist) {
      await this.EventRepository.delete({ id });
      const isRemove = await this.findOne(id);
      if (!isRemove) {
        return {
          id,
          message: `событие с id: ${id} успешно удалёно`,
          status: 'success',
        };
      } else {
        return { message: `событие с id: ${id} не удалёно`, status: 'error' };
      }
    }
  }
}
