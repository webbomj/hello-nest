import { Controller, Delete, Get, Patch, Post, Param, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}
  
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id)
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData)
  }

  @Delete(":id")
  remove(@Param('id') movieId: number) {
    return this.moviesService.remove(movieId);
  }

  @Patch(":id")
  patch(@Param('id') movieId: number, @Body() updateData: any): void {
    return this.moviesService.patch(movieId, updateData)
  }

}
