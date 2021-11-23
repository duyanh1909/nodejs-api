import express from 'express';
import ProductController from './controller';
import {categoriesExist} from '../../middleware/category-middleware';
import {productsExist} from '../../middleware/product-middleware';


const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", productsExist, controller.get())
    .post("/", controller.create())
    .put("/:id", productsExist, controller.update())
    .delete("/:id", productsExist, controller.delete())
export default router;