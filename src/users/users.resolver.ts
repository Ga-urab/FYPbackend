import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { User } from './users.entity';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User) 
  async registerUser(
    @Args('username', { type: () => String }) username: string,
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Args('userpoint', { type: () => Number, defaultValue: 10 }) userpoint: number, // Set default value to 10
  ) {
    return this.userService.createUser(username, email, password, userpoint);
  }

  @Query(() => User)
  async userById(@Args('_id', { type: () => String }) _id: string) {
    return this.userService.findUserById(_id);
  }
  @Mutation(() => String) 
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string | null> {
    const user = await this.userService.validateUser(email, password);
    if (user) {
      const accessToken = await this.userService.createAccessToken(user);
      return accessToken;
    }
    return null;
  }

  @Mutation(() => User)
  async increaseUserPoints(
    @Args('userId', { type: () => String }) userId: string,
    @Args('points', { type: () => Number }) points: number,
  ) {
    return this.userService.increaseUserPoints(userId, points);
  }

  @Mutation(() => User)
  async decreaseUserPoints(
    @Args('userId', { type: () => String }) userId: string,
    @Args('points', { type: () => Number }) points: number,
  ) {
    return this.userService.decreaseUserPoints(userId, points);
  }
  @Query(() => [User])
async allUsers() {
  return this.userService.findAllUsers();
}
@Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }


}