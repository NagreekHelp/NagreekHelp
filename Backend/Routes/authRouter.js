import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middlewares/validation.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterInput, registerUser);
authRouter.post('/login', validateLoginInput, loginUser);

export default authRouter;