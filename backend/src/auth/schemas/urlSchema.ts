
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({timestamps: true})
export class Url extends Document {
  
  @Prop({ required: true,unique:true })
  shortUrl:String

  @Prop({ required: true,unique:true})
  longUrl:String

  @Prop({ required: true})
    userId:String
  
  // @Prop({ default: 0})
  // clickCout: number

  @Prop({ default: Date.now})
  createdAt: Date

}
export const UrlSchema = SchemaFactory.createForClass(Url);
