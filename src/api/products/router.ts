import express from 'express';
import ProductController from './controller';
import {categoriesExist} from '../../middleware/category-middleware';
import {productsExist} from '../../middleware/product-middleware';
import {authenticate, authorize} from './../../middleware/auth'

const router = express.Router();
const controller = new ProductController();
router
    .get("/", controller.find())
    .get("/:id", productsExist, controller.get())
    .post("/", authenticate, authorize, controller.create())
    .put("/:id", authenticate, authorize, productsExist, controller.update())
    .delete("/:id", authenticate, authorize, productsExist, controller.delete())
export default router;