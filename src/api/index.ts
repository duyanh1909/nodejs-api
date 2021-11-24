import express from 'express';
import routerProduct from './products/router';
import routerCategory from './categories/router';
import routerOrder from './orders/router';
import routerUser from './users/router';


const app = express();
app.use("/products", routerProduct);
app.use("/categories", routerCategory)
app.use("/orders", routerOrder)
app.use("/users", routerUser)
export default app;