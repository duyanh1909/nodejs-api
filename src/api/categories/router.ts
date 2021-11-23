import express from 'express';
import ProductController from './controller'
import { categoriesExist } from '../../middleware/category-middleware'

const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", categoriesExist, controller.get())
    .post("/", controller.create())
    .put("/:id", categoriesExist, controller.update())
    .delete("/:id", categoriesExist, controller.delete())

export default router;