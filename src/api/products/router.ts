import express from 'express';
import ProductController from './controller'
const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", controller.create())
    .put("/:id", controller.update())
    .delete("/:id", controller.delete())
export default router;