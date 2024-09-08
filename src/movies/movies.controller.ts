import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {

    constructor (private moviesService: MoviesService) {}

    @Get('popular')
    @ApiResponse({status: 200, description: 'retorna todas las peliculas'})
    async getMovies(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        const result = await this.moviesService.getPopularMovies(page, pageSize);
        return result;
    }

    @Get(':id')
    async getMovieById(@Param('id') id: string) {
        const movieId = parseInt(id, 10);
        return await this.moviesService.getMovieById(movieId);
    }

    @Get('discover')
    async discoverMovies(
        @Query('genreId') genreId?: number,
        @Query('keyword') keyword?: string,
    ) {
        return await this.moviesService.discoverMovies(genreId, keyword);
    }
}