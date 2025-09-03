
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  _id: string;
 
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

    @Prop({ type: String, default: null })  
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
