import express from 'express';
import userController from './controller';
import {authenticate, authorize} from './../../middleware/auth'

const router = express.Router();
const controller = new userController();
router
    .get("/", authenticate, authorize, controller.find())
    .get("/detail", authenticate, authorize, controller.get())
    .post("/login", controller.login())
    .put("/update-password", controller.update())
    .post("/register", controller.createUser())
export default router;