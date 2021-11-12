import express from 'express';
import routerProduct from './products/router';
import routerCategory from './categories/router';

const app = express();
app.use("/products", routerProduct);
app.use("/categories", routerCategory)
export default app;