
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Url extends Document {
  
  @Prop({ required: true,unique:true })
  shortUrl:String

  @Prop({ required: true,unique:true})
  longUrl:String

}
export const UrlSchema = SchemaFactory.createForClass(Url);
