import express from 'express';
import { UserModel } from "../models/user.js";
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import {validateUserInput} from "../utils/UserValidationUtil.js";
import {UserRegisterRequest} from "../types/userTypes.js";



// User Registration Endpoint
export const userRegister = async (req: express.Request, res: express.Response) => {
    const reqUser = req.body as UserRegisterRequest;
    const { userName, userPassword } = reqUser;

    try {
        const validationError = validateUserInput(userName, userPassword);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const existingUser = await UserModel.findOne({ userName });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const userHashPassword = await hashPassword(userPassword);
        const newUser = new UserModel({ userName, userPassword: userHashPassword });
        await newUser.save();

        return res.status(201).json({ userId: newUser._id });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// User Login Endpoint
export const userLogin = async (req: express.Request, res: express.Response) => {
    const reqUser = req.body as UserRegisterRequest;
    const { userName, userPassword } = reqUser;

    try {
        const validationError = validateUserInput(userName, userPassword);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const existingUser = await UserModel.findOne({ userName });

        if (!existingUser) {
            return res.status(400).json({ message: `User with username ${userName} does not exist` });
        }

        const passwordValidation = await comparePasswords(userPassword, existingUser.userPassword);

        if (!passwordValidation) {
            return  res.status(401).send({ message: 'Invalid email or password' })
        }

        return res.status(200).json({ userId: existingUser._id });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};