import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(user: User) {
    user.uuid = uuidv4();
    user.password = await bcrypt.hash(user.password, 12);
    return this.usersService.createOrUpdateOne(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(
        'Incorrect email or password.',
        'authentication/invalid-credentials.',
      );
    }

    return await this.jwtService.signAsync({
      email: user.email,
      uuid: user.uuid,
      role: user.role,
    });
  }
}
