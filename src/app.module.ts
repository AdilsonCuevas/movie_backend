import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, AuthModule, MoviesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
