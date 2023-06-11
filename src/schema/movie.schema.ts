import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'
import { ObjectIdScalar } from '../object-id.scalar'

@ObjectType()
export class Movie extends BaseModel {

    @Field()
    @Prop({ required: true })
      title: string

    @Field()
    @Prop({ required: true })
      description: string

    @Field(() => Date)
    @Prop({ required: true })
      releaseDate: Date

    @Field(() => User)
    @Prop({ ref: User, required: true })
      user: Ref<User, Types.ObjectId>
}

export const MovieModel = getModelForClass(Movie,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class MovieInput {
    @Field()
    @MinLength(3)
      title: string
    @MinLength(3)
    @Field()
      description: string
    @IsDate()
    @Field(() => Date)
      releaseDate: Date
}

@ObjectType()
export class PaginatedMovieResponse extends PaginatedResponse(Movie){}
