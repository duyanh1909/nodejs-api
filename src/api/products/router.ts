import express from 'express';
import ProductController from './controller';
import {categoriesExist} from '../../middleware/category-middleware';
import {productsExist, emptyEntryProduct} from '../../middleware/product-middleware';


const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", controller.get())
    .post("/", emptyEntryProduct, categoriesExist, controller.create())
    .patch("/:id", productsExist, emptyEntryProduct, categoriesExist, controller.update())
    .delete("/:id", productsExist, controller.delete())
export default router;