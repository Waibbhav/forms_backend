import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, default: '', index: true })
  name: string;

  @Prop({ type: String, default: '', index: true })
  phone: string;

  @Prop({ type: String, default: '', index: true })
  email: string;

  @Prop({ type: String, default: '', index: true })
  address: string;

  @Prop({
    type: String,
    default: 'Inactive',
    enum: ['Active', 'Inactive', 'Banned'],
    index: true,
  })
  status: string;

  @Prop({ type: Boolean, default: false, index: true })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongooseAggregatePaginate);
