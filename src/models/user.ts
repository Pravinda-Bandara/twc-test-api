import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop({ required: true, unique: true })
    userName!: string;

    @prop({ required: true })
    userPassword!: string;
}

export const UserModel = getModelForClass(User);
