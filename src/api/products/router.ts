import express from 'express';
import ProductController from './controller';
import {categoriesExist, emptyEntryProduct} from '../../middleware/product-middleware';

const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", emptyEntryProduct, categoriesExist, controller.create())
    .put("/:id", emptyEntryProduct, categoriesExist, controller.update())
    .delete("/:id", controller.delete())
export default router;