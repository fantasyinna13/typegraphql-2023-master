import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { MovieInput, MovieModel } from '../schema/movie.schema'
import { Types } from 'mongoose'

export class MovieService {
  async getMovies(paginatedInput: PaginationInput) {
    const userPaginationServices =
        new PaginationService(
          {
            model: MovieModel,
            populate: 'user',
          })
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getMovie(_id: string) {
    return MovieModel.findById(_id).populate('user').lean()
  }
  async createMovie(movie: MovieInput, user: Types.ObjectId) {
    const movieWithUser = { ...movie, user }
    const createdMovie = await MovieModel.create(movieWithUser)
    return createdMovie.populate('user')
  }
  async deleteMovie(_id: string) {
    return MovieModel.findByIdAndRemove(_id).populate('user')
  }
  async updateMovie(_id: string, movie: MovieInput) {
    return MovieModel.findByIdAndUpdate(_id, movie, { new: true }).populate('user')
  }
}