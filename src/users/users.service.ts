import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(user: User): Promise<Omit<User, 'password'>> {
    const email = user.email;
    const exist = !!(await this.usersRepository.findOneBy({ email }));

    if (exist) {
      throw new BadRequestException(
        'Este email ya ha sido registrado.',
        'authentication/email-already-in-use',
      );
    }

    const resUser = await this.usersRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = resUser;
    return result;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ uuid });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async updateOne(uuid: string, data: any) {
    let user = await this.usersRepository.findOneBy({ uuid });
    const exist = !!user;

    if (!exist) {
      throw new BadRequestException(
        'No se encontró un usuario con el id proporcionado.',
        'authentication/user-not-found',
      );
    }

    if ('email' in data) {
      const email = data.email;
      const exist = !!(await this.usersRepository.findOneBy({ email }));

      if (exist) {
        throw new BadRequestException(
          'Este email ya ha sido registrado.',
          'authentication/email-already-in-use',
        );
      }
    }

    if ('password' in data) {
      data.password = await bcrypt.hash(data.password, 12);
      console.log(data.password);
    }

    user = { ...user, ...data };
    const updatedUser = await this.usersRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;
    return result;
  }

  async deleteOne(uuid: string): Promise<void> {
    await this.usersRepository.delete(uuid);
  }
}
