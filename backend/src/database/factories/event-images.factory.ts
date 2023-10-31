import { ImageEntity } from 'src/images/entities/image.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(ImageEntity, () => {
  const image = new ImageEntity();
  image.path = `/uploads/${faker.string.uuid()}.jpg`;
  return image;
});
