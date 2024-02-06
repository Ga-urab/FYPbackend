// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UploaderModule } from './uploader/uploader.module';
import { MulterModule } from '@nestjs/platform-express';
import { BusinessModule } from './businesses/businesses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { path: join(process.cwd(), 'src/schema.gql'), federation: 2 },
      playground: true,
    }),
    
    MongooseModule.forRoot('mongodb://localhost:27017/fypbackend'),
    MulterModule.register({
      dest: './uploads',
    }),
    //UsersModule,
    UploaderModule,
   BusinessModule,
  ],
})
export class AppModule {}
 