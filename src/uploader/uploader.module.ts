// uploader.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UploaderResolver } from './uploader.resolver';
import { UploaderController } from './uploader.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // Import the ApolloDriver and its config interface

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Add the driver option
      autoSchemaFile: { path: 'schema.gql',}, // Adjust as needed
      playground: true,
    }),
  ],
  controllers: [UploaderController],
  providers: [UploaderResolver],
})
export class UploaderModule {}
