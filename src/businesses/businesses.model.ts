import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Business {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: false })
  description: string;

  @Field()
  @Prop({ required: true })
  author: string;

  @Field()
  @Prop({ required: false })
  review: number;

  @Field()
  @Prop({ required: true })
  point: number;

  @Field()
  @Prop({ type: [String], required: false })
  comment: string[];
}

export type BusinessDocument = Business & Document;

export const BusinessSchema = SchemaFactory.createForClass(Business);
