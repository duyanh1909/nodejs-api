import orders from "../models/Orders";

export const checkIsBill =  async (req, res, next) => {
    try {
        const id = req.params.id;
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