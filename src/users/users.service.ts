
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.entity';
import { TokenService } from './token.service';
import { Document } from 'mongoose';

@Injectable()
export class UserService {
  constructor(    @InjectModel(User.name) private userModel: Model<User>,
  private tokenService: TokenService,
) {}
async createAccessToken(user: User): Promise<string> {
  const payload = { userId: user._id, email: user.email , name: user.username, point: user.userpoint};
  return this.tokenService.generateToken(payload);
}

async verifyAccessToken(token: string): Promise<any> {
  return this.tokenService.verifyToken(token);
}
  async createUser(username: string, email: string, password: string, userpoint: number): Promise<User> {
    const user = new this.userModel({ username, email, password, userpoint });
    return user.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findUserById(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }

  async increaseUserPoints(userId: string, points: number): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.userpoint += points;
    await user.save();
    return user;
  }

  async decreaseUserPoints(userId: string, points: number): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.userpoint -= points;
    await user.save();
    return user;
  }
  async remove(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
  
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
}
