import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
// @ts-ignore
import { User } from './user.js';

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export class Contact {
    @prop({ required: true })
    number!: string;

    @prop({ required: true })
    name!: string;

    @prop({ required: true })
    email!: string;

    @prop({ enum: Gender, required: true })
    gender!: Gender;

    @prop({ ref: () => User })
    user!: Ref<User>;
}

export const ContactModel = getModelForClass(Contact);
