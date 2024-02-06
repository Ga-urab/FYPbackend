import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BusinessesService } from './Businesses.service';
import { Business } from './Businesses.model';

@Resolver(() => Business)
export class BusinessesResolver {
  constructor(private readonly BusinesssService: BusinessesService) {}

  @Query(() => [Business])
  async Businesss(
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('skip', { type: () => Number, defaultValue: 0 }) skip: number,
  ) {
    return this.BusinesssService.getBusinesss(limit, skip);
  }

  @Query(() => Business)
  async Business(@Args('id', { type: () => String }) id: string) {
    return this.BusinesssService.getBusinessById(id);
  }

  @Mutation(() => Business)
  async createBusiness(
    @Args('name', { type: () => String }) name: string,
    @Args('description', { type: () => String }) description: string,
    @Args('author', { type: () => String }) author: string,
    @Args('point', { type: () => Number }) point: number,
    @Args('imgUrls', { type: () => [String], nullable: true })
    imgUrls: string[],
  ) {
    return this.BusinesssService.createBusiness(name, description, author, point, imgUrls);
  }

  @Mutation(() => Business)
  async updateBusiness(
    @Args('_id', { type: () => String }) _id: string,
    @Args('name', { type: () => String }) name: string,
    @Args('description', { type: () => String }) description: string,
    @Args('author', { type: () => String }) author: string,
    @Args('point', { type: () => Number }) point: number,
    @Args('imgUrls', { type: () => [String], nullable: true })
    imgUrls: string[],
  ) {
    return this.BusinesssService.updateBusiness(_id, name, description, author, point, imgUrls);
  }

  @Mutation(() => Business)
  async deleteBusiness(@Args('BusinessId', { type: () => String }) BusinessId: string) {
    return this.BusinesssService.deleteBusiness(BusinessId);
  }
}
