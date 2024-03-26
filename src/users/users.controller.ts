import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createOrUpdateOne(user);
  }

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserByEmail(@Param('id') email: string) {
    return this.usersService.findOne(email);
  }

  @Put()
  updateUser(@Body() user: User) {
    return this.usersService.createOrUpdateOne(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') email: string) {
    return this.usersService.deleteOne(email);
  }
}
