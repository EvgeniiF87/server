import { EventEntity } from 'src/event/entities/event.entity';
import { faker } from '@faker-js/faker';
import { setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import { define } from 'typeorm-seeding';

define(EventEntity, () => {
  const start = faker.date.between({
    from: new Date('2023-10-01'),
    to: new Date('2023-12-31'),
  });

  const timeStart = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(start), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const end = faker.date.soon({
    days: 90,
    refDate: new Date(start),
  });

  const timeEnd = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(end), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const show = faker.date.soon({
    days: 4,
    refDate: new Date(start),
  });

  const timeShow = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(show), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const event = new EventEntity();
  event.title = faker.word.words({ count: { min: 5, max: 10 } });
  event.desc = faker.lorem.sentences(6);
  event.preview = `/uploads/${faker.string.uuid()}.jpg`;
  event.existTimeStart = timeStart;
  event.existTimeEnd = timeEnd;
  event.whenStartToShow = timeShow;
  event.userId = 1;
  return event;
});
