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
import { AuthorizationGuard } from '../guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createOne(user);
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
  updateUser(@Param('uuid') uuid: string, @Body() data: any) {
    return this.usersService.updateOne(uuid, data);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string) {
    return this.usersService.deleteOne(uuid);
  }
}
