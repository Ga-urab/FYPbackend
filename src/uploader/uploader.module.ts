// uploader.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UploaderResolver } from './uploader.resolver';
import { UploaderController } from './uploader.controller';
import { UploadedFiles, UploadedFileSchema } from './uploader.model';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; 

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: { path: 'src/schema.gql',},
    //   playground: true,
    // }),
    MongooseModule.forFeature([{ name: UploadedFiles.name, schema: UploadedFileSchema }]),
  ],
  controllers: [UploaderController],
  providers: [UploaderResolver],
})
export class UploaderModule {}
