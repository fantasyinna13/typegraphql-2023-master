import { UserResolver } from './user.resolver'
import { MovieResolver } from './movie.resolver'
export const resolvers = [
  UserResolver,
  MovieResolver,
] as const