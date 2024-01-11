import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Resolver(() => User)
export class UsersResolver {
 constructor(private readonly usersService: UsersService) {}

 @Mutation(() => User)
 async signup(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
  ): Promise<User> {
    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    return this.usersService.create(user);
 }

 @Mutation(() => User)
 async login(@Args('email') email: string, @Args('password') password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    return null;
 }
}