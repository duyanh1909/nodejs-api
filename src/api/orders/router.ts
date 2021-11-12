import express from 'express';
import OrderController from './controller'
const router = express.Router();
const controller = new OrderController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", controller.create())
    .delete("/:id", controller.delete())
    .post("/add", controller.add())
    .delete("/remove/:id", controller.remove())
export default router;