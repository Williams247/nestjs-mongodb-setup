import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../utils/types';

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  image: string;
  @Prop({ required: true })
  verified: boolean;
  @Prop({ required: true })
  role: Role;
  @Prop({ required: false })
  disabled: boolean;
}

// Create an actual mongoose schema from the Todos class
export const UserSchema = SchemaFactory.createForClass(User);
