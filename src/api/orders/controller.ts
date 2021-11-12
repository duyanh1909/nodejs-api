import orders from '../../models/Orders';
import products from '../../models/Products';
import detailOrders from '../../models/DetailOrders';

class orderController {
    private totalPriceOrder (arr){
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i].price * arr[i].quanlity;
        }
        return total;
    }

    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const detailOrder = await detailOrders.find({idOrder: id}).populate('idProduct');
                if (detailOrder) {
                    return res.send({ data: detailOrder });
                }
                return res.send({message: "Not have order!!!"});
            }
            catch {
                return res.send({message: "order not found!!!"});
            }  
        };
    };

    find() {
        return async (req, res) => {
            try {
                const order = await orders.find();
                if (order) {
                    return res.send({ data: order });
                }       
                return res.send({message: "Not have order!!!"});    
            }
            catch {
                return res.send({message: "order not found!!!"}); 
            }
        };
    };
    
    create() {
        return async (req, res) => {
            try {
                const product = await products.findOne({_id: req.body.idProduct});
                if (!product) {
                    res.send({ message: "No have product"})
                }
                const price = product.price;
                const order = new orders({total: price * req.body.quanlity});
                order.save();
                req.body.idOrder = order._id;
                req.body.price = price;
                const detailorder = new detailOrders(req.body);
                detailorder.save();
                res.send({ message: 'Create Successs' });
            }
            catch {
                res.send({ message: "Create Fail"});
            }
        }
    };

    update() {
        return async (req, res) => {
            try {
                const detailOrder = await detailOrders.findOne({ _id: req.params.id});
                const order = await orders.findOne({ _id: detailOrder.idOrder});
                if (req.body.idProduct != detailOrder.idProduct) {
                    const product = await products.findOne({_id: req.body.idProduct});
                    order.total = order.total - detailOrder.price * detailOrder.quanlity + product.price * req.body.quanlity;
                }
                else {
                    order.total = order.total - detailOrder.price * detailOrder.quanlity + detailOrder.price * req.body.quanlity;
                }
                // order.total -= detailOrder.price * req.body.quanlity;
                const deleteDetail = await detailOrders.updateOne({idProduct: req.body.idProduct, quanlity: req.body.quanlity});
                const updateOder = await orders.updateOne(order);
                res.send({message: "Remove Success"});
            }
            catch {
                res.send({ message: "Remove Fail"});
            }
        }
    }

    remove () {
        return async (req, res) => {
            try {
                const detailOrder = await detailOrders.findOne({ _id: req.params.id});
                const order = await orders.findOne({ _id: detailOrder.idOrder});
                order.total -= detailOrder.price * detailOrder.quanlity;
                const deleteDetail = await detailOrders.deleteOne({_id: req.params.id });
                const updateOder = await orders.updateOne(order);
                res.send({message: "Remove Success"});
            }
            catch {
                res.send({ message: "Remove Fail"});
            }
        }
    };

    delete() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const detailOrder = await detailOrders.deleteMany({ idOrder: id})
                const order = await orders.deleteOne({ _id: id});
                res.send({message: "Delete Success"});
            }
            catch {
                res.send({ message: "Delete Fail"});
            }
        }
    };

    add () {
        return async (req, res) => {
            try {
                const product = await products.findOne({_id: req.body.idProduct});
                const price = product.price;
                const detailOrder = new detailOrders({ idOrder: req.body.idOrder, idProduct: req.body.idProduct, price: price , quanlity: req.body.quanlity});
                detailOrder.save();
                const order = await orders.findOne({ _id: req.body.idOrder});
                order.total += price * req.body.quanlity;
                const updateOder = await orders.updateOne(order);
                res.send({message: "Add Success"});
            }
            catch {
                res.send({ message: "Add Fail"});
            }
        }
    };
};

export default orderController;