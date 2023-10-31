import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(UserEntity)().create({
      name: 'Артур',
      email: 'admin@mail.ru',
      password: await bcrypt.hash('123456789', 10),
      roleId: 1,
    });
  }
}
