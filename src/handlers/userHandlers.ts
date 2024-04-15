import express from 'express';
import {UserModel} from "../models/user.js";
import {hashPassword,comparePasswords} from '../utils/passwordUtils.js'


interface userRegisterRequest {
    userName: string;
    userPassword: string;
}


export const userRegister = async (req: express.Request, res: express.Response) => {

    const reqUser = req.body as userRegisterRequest
    const userName  = reqUser.userName;
    const userPassword = reqUser.userPassword;


    try {
        // Check if username already exists
        const existingUser = await UserModel.findOne({ userName:userName });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        //Hashin password
        const userHashPassword =await hashPassword(userPassword);

        // Create a new user
        const newUser = new UserModel({ userName:userName, userPassword:userHashPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const userLogin = async (req: express.Request, res: express.Response) => {
    const reqUser = req.body as userRegisterRequest
    const userName  = reqUser.userName;
    const userPassword = reqUser.userPassword;


    try {
        // Check if username already exists
        const existingUser = await UserModel.findOne({ userName:userName });

        if (!existingUser) {
            return res.status(400).json({ message: `User with username ${userName} not exists` });
        }

        //check password valid password
        const passwordValidation =await comparePasswords(userPassword,existingUser.userPassword);

        if(!passwordValidation){
            return res.status(400).json({ message: `Entered password not valid`});
        }

        return res.status(201).json({userName});

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}