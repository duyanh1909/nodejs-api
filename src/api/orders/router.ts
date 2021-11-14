import express from 'express';
import OrderController from './controller'
import {productsExist} from '../../middleware/product-middleware';
import {checkIsBill, checkDetailIsBill} from '../../middleware/order-middleware';

const router = express.Router();
const controller = new OrderController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", productsExist, controller.create())
    .delete("/:id", checkIsBill, controller.delete())
    .post("/add", checkIsBill, productsExist, controller.add())
    .patch("/update/:id", checkDetailIsBill, controller.update())
    .delete("/remove/:id", checkDetailIsBill, controller.remove())
    .patch("/bill/:id", checkIsBill, controller.bill())
export default router;