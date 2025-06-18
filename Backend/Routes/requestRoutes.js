import express from 'express';
import {
  getRequestsByUser,
  createRequest,
  updateRequest,
} from '../controllers/requestController.js';
import { protect } from '../middlewares/protect.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getFinsihedreq, getMiddlereq, getRequestedReq } from '../controllers/adminRequestController.js';
import { updateAdminRequest, updateUserRequest } from '../controllers/updateRequestController.js';

const requestsRouter= express.Router();
requestsRouter.post('/create',authenticateToken, createRequest);

requestsRouter.get('/byUser', authenticateToken, getRequestsByUser);

requestsRouter.get('/byAdmin/requested', authenticateToken, getRequestedReq);
requestsRouter.get('/byAdmin/middlereq', authenticateToken, getMiddlereq);
requestsRouter.get('/byAdmin/finished', authenticateToken, getFinsihedreq);

requestsRouter.patch('/byUser/updateReq', authenticateToken, updateUserRequest)
requestsRouter.patch('/byAdmin/updateReq', authenticateToken, updateAdminRequest)


export default requestsRouter;
