import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { AuthorizationGuard } from '../authorization/jwt/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createOrUpdateOne(user);
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get(':uuid')
  getUserByEmail(@Param('uuid') email: string) {
    return this.usersService.findOne(email);
  }

  @UseGuards(AuthorizationGuard)
  @Put(':uuid')
  updateUser(@Body() user: User) {
    return this.usersService.createOrUpdateOne(user);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.usersService.deleteOne(uuid);
  }
}
