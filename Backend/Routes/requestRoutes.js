import express from 'express';
import {
  getRequestsByUser,
  createRequest,
  updateRequest,
} from '../controllers/requestController.js';
import { protect } from '../middlewares/protect.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const requestsRouter= express.Router();

requestsRouter.get('/byUser', authenticateToken, getRequestsByUser);

requestsRouter.post('/create',authenticateToken, createRequest);
requestsRouter.patch('/:id', updateRequest);

export default requestsRouter;
