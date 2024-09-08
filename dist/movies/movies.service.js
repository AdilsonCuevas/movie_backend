"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let MoviesService = class MoviesService {
    constructor(httpService) {
        this.httpService = httpService;
        this.TMDB_API_KEY = '3489e4ce1325a942e1a9cbb992945147';
    }
    async getPopularMovies(page, pageSize) {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.TMDB_API_KEY}&page=${page}&language=en-US`;
        try {
            const response = await this.httpService.get(url).toPromise();
            const data = response.data;
            return {
                results: data.results.slice(0, pageSize),
                total_pages: data.total_pages,
            };
        }
        catch (error) {
            throw new Error(`Error TMDB: ${error.message}`);
        }
    }
    async getMovieById(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.TMDB_API_KEY}`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return response.data;
    }
    async discoverMovies(genreId, keyword) {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.TMDB_API_KEY}`;
        if (genreId) {
            url += `&with_genres=${genreId}`;
        }
        if (keyword) {
            url += `&query=${encodeURIComponent(keyword)}`;
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return response.data.results;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map