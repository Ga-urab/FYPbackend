import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {path:join(process.cwd(), 'src/schema.gql'),federation:2},
      playground: true,
      // buildSchemaOptions: {
      //   orphanedTypes: [Activity],
      // },
    }),
    
    MongooseModule.forRoot('mongodb://localhost:27017/fypbackend'),
    UsersModule,
  ],
 
})
export class AppModule { }