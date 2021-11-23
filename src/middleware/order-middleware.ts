import orders from "../models/Orders";
import detailOrders from "../models/DetailOrders";
import products from "../models/Products";
import { productsExist } from "./product-middleware";

export const orderExist =  async (req, res, next) => {
    try {
        const id = req.body.orderId || req.params.id;
        const order = await orders.findOne({ _id: id });
        if (!order) {
            return res.status(404).send({message: "No have order in DB"});
        }
        next();
    }
    catch {
        return res.status(404).send({ message: "Not found order" });
    }
};

export const detailOrderExist =  async (req, res, next) => {
    try {
        const id = req.body.orderId || req.params.id;
        const detailOrder = await detailOrders.findOne({ orderId: id });
        if (detailOrder) {
            return res.status(400).send({message: "Order existed"});
        }
        next();
    }
    catch {
        return res.status(400).send({ message: "Not found order" });
    }
};

export const listProductExist =  async (req, res, next) => {
    const arr = req.body.data;
    let errors = new Array();
    for (let i = 0; i < req.body.data.length; i++) {
        let error = {};
        try {
            const product = await products.findOne({ _id: req.body.data[i].productId });
            if ((!product) && (typeof req.body.data[i].quantity != 'number')) {
                error["id"] = req.body.data[i].productId;
                error["quantity"] = req.body.data[i].quantity;
            }
        }
        catch {
            error["id"] = req.body.data[i].productId;
            error["quantity"] = req.body.data[i].quantity;
        }
        if (Object.keys(error).length != 0) {
            errors.push(error);
        }
    }
    if (errors.length != 0) {
        return res.status(400).send({
            message: "Something went wrong",
            debugInfo: errors
        });
    }
    next();
};

// export const checkDetailIsBill =  async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const detailOrder = await detailOrders.findOne({_id: id});
//         const order = await orders.findOne({ _id: detailOrder.idOrder }).where('isBill').equals(false);
//         if (!order) {
//             return res.send({message: "The bill paid so did not change"});
//         }
//         next();
//     }
//     catch {
//         return res.send({message: "Not found order"});
//     }
// };

// export const checkIsBill =  async (req, res, next) => {
//     try {
//         const id = req.params.id || req.body.orderId;
//         const order = await orders.findOne({_id: id}).where('isBill').equals(false);
//         if (!order) {
//             return res.status(404).send({message: "The bill paid so did not change"});
//         }
//         next();
//     }
//     catch {
//         return res.status(404).send({message: "Not found order"});
//     }
// };