import { Injectable } from '@nestjs/common';
import { CreateTokenInput } from './dto/create-token.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { addMonths } from 'date-fns';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(createTokenInput: CreateTokenInput) {
    return await this.tokenRepository.save({ ...createTokenInput });
  }

  // findAll() {
  //   return `This action returns all tokens`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} token`;
  // }

  // update(id: number, updateTokenInput: UpdateTokenInput) {
  //   return `This action updates a #${id} token`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} token`;
  // }

  async generateRefreshToken(userId: number): Promise<CreateTokenInput> {
    return { expire: addMonths(new Date(), 2), refresh_token: v4(), userId };
  }
}
