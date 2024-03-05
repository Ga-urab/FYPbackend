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
  point: number;

  @Field(() => [String]) // Field for storing image URLs
  @Prop({ type: [String], default: [], required: false })
  imgUrls: string[];

  @Field()
  @Prop({ type: Date })
  lastIncreaseTimestamp: Date;
}

export type BusinessDocument = Business & Document;

export const BusinessSchema = SchemaFactory.createForClass(Business);
