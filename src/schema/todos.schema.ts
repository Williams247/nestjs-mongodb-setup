import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todos {
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  createdAt: string;
  @Prop()
  note: string;
}

// Create an actual mongoose schema from the Todos class
export const TodosSchema = SchemaFactory.createForClass(Todos);

// Todos.name => Todos, Todos being the className
