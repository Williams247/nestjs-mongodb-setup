import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../types';

@Schema()
export class Admin {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  image: string;
  @Prop({ required: false })
  verified: boolean;
  @Prop({ required: true })
  role: Role;
  @Prop({ required: false })
  disabled: boolean;
}

// Create an actual mongoose schema from the Todos class
export const AdminSchema = SchemaFactory.createForClass(Admin);

// Todos.name => Todos, Todos being the className
