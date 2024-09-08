import { HttpService } from '@nestjs/axios';
export interface TmdbResponse {
    results: any[];
    total_pages: number;
}
export declare class MoviesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    TMDB_API_KEY: string;
    getPopularMovies(page: number, pageSize: number): Promise<TmdbResponse>;
    getMovieById(id: number): Promise<any>;
    discoverMovies(genreId?: number, keyword?: string): Promise<any>;
}
