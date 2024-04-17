import express from 'express';
import { UserModel } from "../models/user.js";
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';

interface UserRegisterRequest {
    userName: string;
    userPassword: string;
}

// User Registration Endpoint
export const userRegister = async (req: express.Request, res: express.Response) => {
    const reqUser = req.body as UserRegisterRequest;
    const { userName, userPassword } = reqUser;

    try {
        // Check if username already exists
        const existingUser = await UserModel.findOne({ userName });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hashing password
        const userHashPassword = await hashPassword(userPassword);

        // Create a new user
        const newUser = new UserModel({ userName, userPassword: userHashPassword });
        await newUser.save();

        // Respond with user ID only
        return res.status(201).json({ userId: newUser._id });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// User Login Endpoint
export const userLogin = async (req: express.Request, res: express.Response) => {
    const reqUser = req.body as UserRegisterRequest;
    const { userName, userPassword } = reqUser;

    try {
        // Check if username exists
        const existingUser = await UserModel.findOne({ userName });

        if (!existingUser) {
            return res.status(400).json({ error: `User with username ${userName} does not exist` });
        }

        // Check password validity
        const passwordValidation = await comparePasswords(userPassword, existingUser.userPassword);

        if (!passwordValidation) {
            return  res.status(401).send({ message: 'Invalid email or password' })
        }

        // Respond with user ID only
        return res.status(200).json({ userId: existingUser._id });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
