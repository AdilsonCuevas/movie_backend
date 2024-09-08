import { MoviesService } from './movies.service';
export declare class MoviesController {
    private moviesService;
    constructor(moviesService: MoviesService);
    getMovies(page?: number, pageSize?: number): Promise<import("./movies.service").TmdbResponse>;
    getMovieById(id: string): Promise<any>;
    discoverMovies(genreId?: number, keyword?: string): Promise<any>;
}
