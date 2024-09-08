import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

export interface TmdbResponse {
    results: any[];
    total_pages: number;
}

@Injectable()
export class MoviesService {
    constructor(private readonly httpService: HttpService) {}

    TMDB_API_KEY = '3489e4ce1325a942e1a9cbb992945147';

    async getPopularMovies(page: number, pageSize: number): Promise<TmdbResponse> {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.TMDB_API_KEY}&page=${page}&language=en-US`;

        try {
            const response: AxiosResponse<TmdbResponse> = await this.httpService.get(url).toPromise();
            const data = response.data;

            return {
                results: data.results.slice(0, pageSize),
                total_pages: data.total_pages,
            };
        } catch (error) {
            throw new Error(`Error TMDB: ${error.message}`);
        }
    }

    async getMovieById(id: number): Promise<any> {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.TMDB_API_KEY}`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }

    async discoverMovies(genreId?: number, keyword?: string): Promise<any> {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.TMDB_API_KEY}`;
        
        // Añadir filtro por género si se proporciona
        if (genreId) {
        url += `&with_genres=${genreId}`;
        }
    
        // Añadir filtro por palabras clave si se proporciona
        if (keyword) {
        url += `&query=${encodeURIComponent(keyword)}`;
        }
    
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data.results;
    }

}