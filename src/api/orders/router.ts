import express from 'express';
import OrderController from './controller'
// import {productsExist} from '../../middleware/product-middleware';
import {orderExist, detailOrderExist, checkUserDetailOrder, listProductExist} from '../../middleware/order-middleware';
import {authenticate, authorize} from './../../middleware/auth'

const router = express.Router();
const controller = new OrderController();
router
    .get("/", authenticate, authorize, controller.find())
    .get("/:id", authenticate, orderExist, checkUserDetailOrder, controller.get())
    .post("/", authenticate, controller.create())
export default router;