// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersResolver } from './users.resolver';
// import { UsersService } from './users.service';
// import { User, UserSchema } from './users.entity';



// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//     ]),
   
//   ],
//   providers: [UsersResolver, UsersService],
// })
// export class UsersModule { }
// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { User, UserSchema } from './users.entity';
import { TokenService } from './token.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserResolver, TokenService],
})
export class UserModule {}
