import express from 'express';
import {placeOrder, allOrders, userOrders, updateStatus} from '../controllers/order.controller.js';
import authUser from '../middleware/auth.middleware.js';
import adminAuth from '../middleware/admin.auth.js';

const OrderRouter = express.Router();
// Admin Feature
OrderRouter.post('/list', adminAuth, allOrders);
OrderRouter.post('/status', adminAuth, updateStatus);
//Payment Features
OrderRouter.post('/place', authUser, placeOrder);

//user Feature
OrderRouter.post('/userorders', authUser, userOrders);
export default OrderRouter;