import express from 'express';
import routerProduct from './products/router';
import routerCategory from './categories/router';
import routerOrder from './orders/router';


const app = express();
app.use("/products", routerProduct);
app.use("/categories", routerCategory)
app.use("/orders", routerOrder)
export default app;