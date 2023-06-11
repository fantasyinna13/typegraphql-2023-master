import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { MovieService } from '../services/movie.service'
import { Movie,MovieInput, PaginatedMovieResponse } from '../schema/movie.schema'
import { Context } from '../types/context'

@Resolver()
export class MovieResolver {

  constructor(private movieService: MovieService) {
    this.movieService = new MovieService()
  }

  @Query(() => PaginatedMovieResponse)
  async movies(@Args()paginatedInput: PaginationInput):Promise<PaginatedMovieResponse> {
    return this.movieService.getMovies(paginatedInput)
  }

  @Query(() => Movie)
  async movie(@Arg('_id') _id: string):Promise<Movie> {
    return this.movieService.getMovie(_id)
  }

  @Mutation(() => Movie)
  async createMovie(@Ctx(){ user }: Context, @Arg('movie') movie: MovieInput):Promise<Movie> {
    return this.movieService.createMovie(movie, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Movie)
  async deleteMovie(@Arg('_id') _id: string):Promise<Movie> {
    return this.movieService.deleteMovie(_id)
  }
  @Mutation(() => Movie)
  async updateMovie(@Arg('_id') _id: string,
                   @Arg('movie') movie: MovieInput):Promise<Movie> {
    return this.movieService.updateMovie(_id, movie)
  }

}
