import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrUpdateOne(user: User): Promise<Omit<User, 'password'>> {
    const email = user.email;
    const exist = !!(await this.usersRepository.findOneBy({ email }));

    if (exist) {
      throw new BadRequestException(
        'Email already in use.',
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

  async deleteOne(uuid: string): Promise<void> {
    await this.usersRepository.delete(uuid);
  }
}
