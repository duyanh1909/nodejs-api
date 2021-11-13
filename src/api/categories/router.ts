import express from 'express';
import ProductController from './controller'
import {emptyEntryCategory, categoriesExist} from '../../middleware/category-middleware'

const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", emptyEntryCategory, controller.create())
    .patch("/:id", categoriesExist, controller.update())
    .delete("/:id", categoriesExist, controller.delete())

export default router;