import express from 'express';
import OrderController from './controller'
import {productsExist} from '../../middleware/product-middleware';
import {orderExist, detailOrderExist, listProductExist} from '../../middleware/order-middleware';

const router = express.Router();
const controller = new OrderController();
router
    .get("/", controller.find())
    .get("/:id", orderExist, controller.get())
    .post("/", controller.create())
    // .post("/:id", orderExist, detailOrderExist, listProductExist, controller.createDetailOrder())
    // .delete("/:id", checkIsBill, controller.delete())
    // .post("/add", checkIsBill, productsExist, controller.add())
    // .patch("/update/:id", controller.update())
    // .delete("/remove/:id", controller.remove())
    // .patch("/bill/:id", controller.bill())
export default router;