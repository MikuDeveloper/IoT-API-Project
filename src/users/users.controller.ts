import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entities/user.interface';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() body: User): string {
    return `Hiciste POST a usuarios con la data: ${body.name} y ${body.password}.`;
  }

  @Get(':id')
  findOne(@Param('id') param: string) {
    return `Hiciste GET a usuarios para obtener el usuario con el id: ${param}.`;
  }

  @Get()
  findAll(): string {
    return 'Hiciste GET a usuarios para obtener todos los usuarios.';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User) {
    return `Hiciste PUT a usuarios para actualizar al usuario con el id: ${id} y la data: ${user.name + ' y ' + user.password}.`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Hiciste DELETE a usuarios para eliminar al usuario con el id: ${id}.`;
  }
}
