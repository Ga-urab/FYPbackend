import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UploaderResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello, world!';
  }
}
