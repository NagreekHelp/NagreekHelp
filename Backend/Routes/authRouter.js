import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middlewares/validation.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegisterInput, registerUser);
authRouter.post('/login', validateLoginInput, loginUser);
authRouter.get('/profile', authenticateToken ,getUserProfile);
export default authRouter;