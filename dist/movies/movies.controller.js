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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const movies_service_1 = require("./movies.service");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async getMovies(page = 1, pageSize = 10) {
        const result = await this.moviesService.getPopularMovies(page, pageSize);
        return result;
    }
    async getMovieById(id) {
        const movieId = parseInt(id, 10);
        return await this.moviesService.getMovieById(movieId);
    }
    async discoverMovies(genreId, keyword) {
        return await this.moviesService.discoverMovies(genreId, keyword);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Get)('popular'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'retorna todas las peliculas' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieById", null);
__decorate([
    (0, common_1.Get)('discover'),
    __param(0, (0, common_1.Query)('genreId')),
    __param(1, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "discoverMovies", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('Movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map