import {Gender} from "../models/contact.js";
import mongoose from "mongoose";

export interface ContactRequest {
    number: string;
    name: string;
    email: string;
    gender: Gender;
    user: string;
}

export interface ContactResponse {
    _id: mongoose.Types.ObjectId | undefined;
    number: string;
    name: string;
    email: string;
    gender: Gender;
}
