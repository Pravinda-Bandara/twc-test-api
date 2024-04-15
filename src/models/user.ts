import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
    @prop({ required: true })
    username!: string;

    @prop({ required: true })
    password!: string;
}


const UserModel = getModelForClass(User);

export default UserModel;