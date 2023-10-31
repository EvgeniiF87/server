import { faker } from '@faker-js/faker';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { define } from 'typeorm-seeding';

define(TagEntity, () => {
  const tag = new TagEntity();

  tag.name = faker.word.words({ count: { min: 1, max: 2 } });

  return tag;
});
