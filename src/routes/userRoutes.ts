import express from 'express';
import {userRegister,userLogin} from '../handlers/userHandlers.js'

const userRouter = express.Router();

/* GET home page. */
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);

export default userRouter;
