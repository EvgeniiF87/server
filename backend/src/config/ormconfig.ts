import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    username: config.get('TYPEORM_USERNAME'),
    password: config.get('TYPEORM_PASSWORD'),
    database: config.get('TYPEORM_DATABASE'),
    port: config.get('TYPEORM_PORT'),
    entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
  }),
};
