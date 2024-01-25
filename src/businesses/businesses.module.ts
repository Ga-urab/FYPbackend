import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessesResolver } from './Businesses.resolver';
import { BusinessesService } from './Businesses.service';
import { Business, BusinessSchema } from './Businesses.model';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
    ]),

  ],
  providers: [BusinessesResolver, BusinessesService],
})
export class BusinesssModule { }
