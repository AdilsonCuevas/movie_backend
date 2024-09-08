// src/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Cambiado a @nestjs/axios
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [HttpModule],
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}