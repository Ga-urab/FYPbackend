
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  username: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ required: true })
  userpoint: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
