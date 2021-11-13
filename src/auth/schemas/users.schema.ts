import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument =  Users & Document;

@Schema()
export class  Users{
    @Prop({required:true})
    nombre: string;

    @Prop({required:true})
    apellido: string;

    @Prop({required:true,unique:true})
    email: string;

    @Prop({required:true})
    password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);