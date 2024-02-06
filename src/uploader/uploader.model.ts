// uploader.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class UploadedFiles {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  originalname: string;

  @Field()
  @Prop({ required: true })
  filename: string;

  @Field()
  @Prop({ required: true })
  path: string;

  @Field()
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export type UploadedFileDocument = UploadedFiles & Document;

export const UploadedFileSchema = SchemaFactory.createForClass(UploadedFiles);
