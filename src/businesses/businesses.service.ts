import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Business, BusinessDocument } from './Businesses.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectModel(Business.name) private BusinessModel: Model<BusinessDocument>,
  ) {}

  async createBusiness(
    name: string,
    description: string,
    author: string,
    point: number,
    imgUrls?: string[],
  ): Promise<Business> {
    const createdBusiness = new this.BusinessModel({
      name, description, author,point, imgUrls,

    });
    return createdBusiness.save();
  }
  

  async getBusinesss(limit: number = 10, skip: number = 0): Promise<Business[]> {
    return this.BusinessModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getBusinessById(id: string): Promise<Business> {
    return this.BusinessModel.findById(id).exec();
  }

  async updateBusiness(
    _id: string,
    name: string,
    description: string,
    author: string,
    point: number,
    imgUrls?: string[],
  ): Promise<Business> {
    const updatedBusiness = await this.BusinessModel
      .findByIdAndUpdate(
        _id,
        {
          name,
          description,
          author,
          point,
          imgUrls,

        },
        { new: true },
      )
      .exec();
    return updatedBusiness;
  }
  
  async deleteBusiness(BusinessId: string): Promise<Business> {
    const deletedBusiness: Document<any, any, Business> = await this.BusinessModel.findOneAndDelete({ _id: BusinessId }).exec();

    if (deletedBusiness) {
      return deletedBusiness.toObject() as Business;
    } else {
      throw new Error('Business not found');
    }
  }

  async increasePoint(businessId: string, points: number): Promise<Business> {
    const business = await this.BusinessModel.findById(businessId);
    if (!business) {
      throw new Error('Business not found');
    }
    business.point += points;
    await business.save();
    return business;
  }

  async decreasePoint(businessId: string, points: number): Promise<Business> {
    const business = await this.BusinessModel.findById(businessId);
    if (!business) {
      throw new Error('Business not found');
    }
    business.point -= points;
    await business.save();
    return business;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async decreaseBusinessPointsAutomatically() {
    const businesses = await this.BusinessModel.find();

    businesses.forEach(async (business) => {
      const currentTime = new Date();
      if (business.lastIncreaseTimestamp) {
        const timeDifference = currentTime.getTime() - business.lastIncreaseTimestamp.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference >= 3) {
          await this.decreasePoint(business._id, business.point - 10);
          business.lastIncreaseTimestamp = null;
          await business.save();
        }
      }
    });
  }
}
