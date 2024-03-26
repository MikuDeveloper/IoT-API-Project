import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT) || 5432,
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'miku',
      database: process.env.PGDATABASE || 'postgres',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: false,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
