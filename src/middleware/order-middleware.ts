import orders from "../models/Orders";
import detailOrders from "../models/DetailOrders";
export const checkIsBill =  async (req, res, next) => {
    try {
        const id = req.params.id || req.body.idOrder;
        const order = await orders.findOne({_id: id}).where('isBill').equals(false);
        if (!order) {
            return res.send({message: "The bill paid so did not change"});
        }
        next();
    }
    catch {
        return res.send({message: "Not found order"});
    }
};

export const checkDetailIsBill =  async (req, res, next) => {
    try {
        const id = req.params.id;
        const detailOrder = await detailOrders.findOne({_id: id});
        const order = await orders.findOne({_id: detailOrder.idOrder}).where('isBill').equals(false);
        if (!order) {
            return res.send({message: "The bill paid so did not change"});
        }
        next();
    }
    catch {
        return res.send({message: "Not found order"});
    }
};