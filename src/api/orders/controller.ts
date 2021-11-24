import orders from '../../models/Orders';
import products from '../../models/Products';
import detailOrders from '../../models/DetailOrders';
import { errorFormat } from '../../middleware/validateData'

class orderController {
    // private totalPriceOrder (arr) {
    //     let total = 0;
    //     for (let i = 0; i < arr.length; i++) {
    //         total += arr[i].price * arr[i].quanlity;
    //     }
    //     return total;
    // }

    // private async updateProductFromDeleteOrder (arr) {
    //     for (let i = 0; i < arr.length; i++) {
    //         let id = arr[i].idProduct;
    //         let quanlity = arr[i].quanlity;
    //         let product = await products.findOne({ _id: id });
    //         let updateProduct = await products.updateOne({_id: id }, { saled: product.saled - quanlity, quanlity: product.quanlity + quanlity });
    //     }
    // }

    get() {
        return async (req, res) => {
            const id = req.params.id;
            try {
                const detailOrder = await detailOrders.find({ orderId: id }).populate('product');
                if (detailOrder) {
                    return res.status(200).send({ data: detailOrder });
                }
                return res.status(404).send({ message: "Not have order" });
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        };
    };

    find() {
        return async (req, res) => {
            try {
                const order = await orders.find();
                if (order) {
                    return res.status(200).send({ data: order });
                }       
                return res.status(404).send({ message: "Not have order" });    
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        };
    };
    
    // create() {
    //     return async (req, res) => {
    //         try {
    //             const order = new orders();
    //             await order.save();
    //             res.status(200).send({ message: order._id });
    //         }
    //         catch(err) {
    //             return res.status(404).send({ 
    //                 message: "Something went wrong",
    //                 debugInfo: errorFormat(err)
    //             })
    //         }
    //     }
    // }

    create() {
        return async (req, res) => {
            try {
                const order = new orders({ userId: req.user._id });
                await order.save();
                let total = 0;
                let listDetailOrder = new Array();
                for (let i = 0; i < req.body.data.length; i++){
                    let productId = req.body.data[i].productId;
                    let quantity = req.body.data[i].quantity;
                    const product = await products.findOne({ _id: productId });
                    try {
                        const detailOrder = new detailOrders({
                            orderId: order._id,
                            productId: productId,  
                            quantity: quantity, 
                            price: product.price
                        });
                        await detailOrder.save();
                        total += product.price * quantity;
                        listDetailOrder.push(detailOrder._id)
                    }
                    catch(err) {
                        return res.status(404).send({ 
                            message: "Something went wrong",
                            debugInfo: errorFormat(err)
                        })
                    }
                }
                await orders.updateOne({ _id: order._id }, { total: total })
                res.status(200).send({
                    message: "Create success",
                    orderId: order._id, 
                    listDetailOrder: listDetailOrder 
                });
            }
            catch(err) {
                return res.status(404).send({ 
                    message: "Something went wrong",
                    debugInfo: errorFormat(err)
                })
            }
        }
    };

    // update() {
    //     return async (req, res) => {
    //         try {
    //             const detailOrder = await detailOrders.findOne({ _id: req.params.id });
    //             const product = await products.findOne({ _id: detailOrder.idProduct });
    //             const quanlity = Number(req.body.quanlity);
    //             if (product.quanlity < quanlity) {
    //                 return res.send({ message: "Out of stock" });
    //             }
    //             const order = await orders.findOne({ _id: detailOrder.idOrder });
    //             order.total = order.total - detailOrder.price * detailOrder.quanlity + detailOrder.price * quanlity;
    //             const updateDetail = await detailOrders.updateOne({ _id: req.params.id }, { idProduct: req.body.idProduct, quanlity: quanlity, lastUpdate: Date.now() });
    //             const updateOder = await orders.updateOne({ _id: detailOrder.idOrder }, { total: order.total, lastUpdate: Date.now() });
    //             const updateProduct = await products.updateOne( {_id: detailOrder.idProduct }, { saled: product.saled - detailOrder.quanlity + quanlity, quanlity: product.quanlity + detailOrder.quanlity - quanlity });
    //             res.send({ message: "Update Success" });
    //         }
    //         catch {
    //             res.send({ message: "Update Fail" });
    //         }
    //     }
    // }

    // remove () {
    //     return async (req, res) => {
    //         try {
    //             const detailOrder = await detailOrders.findOne({ _id: req.params.id });
    //             const product = await products.findOne({ _id: detailOrder.idProduct });
    //             const order = await orders.findOne({ _id: detailOrder.idOrder});
    //             order.total -= detailOrder.price * detailOrder.quanlity;
    //             const deleteDetail = await detailOrders.deleteOne({ _id: req.params.id });
    //             const updateOder = await orders.updateOne({ _id: detailOrder.idOrder }, { total: order.total, lastUpdate: Date.now() });
    //             const updateProduct = await products.updateOne({_id: detailOrder.idProduct }, { saled: product.saled - detailOrder.quanlity, quanlity: product.quanlity + detailOrder.quanlity });
    //             res.send({ message: "Remove Success" });
    //         }
    //         catch {
    //             res.send({ message: "Remove Fail" });
    //         }
    //     }
    // };

    // delete() {
    //     return async (req, res) => {
    //         const id = req.params.id;
    //         try {
    //             const listDetailOrder = await detailOrders.find({ idOrder: id });
    //             const detailOrder = await detailOrders.deleteMany({ idOrder: id });
    //             const order = await orders.deleteOne({ _id: id });
    //             this.updateProductFromDeleteOrder(listDetailOrder);
    //             res.send({ message: "Delete Success" });
    //         }
    //         catch {
    //             res.send({ message: "Delete Fail" });
    //         }
    //     }
    // };

    // add () {
    //     return async (req, res) => {
    //         try {
    //             const product = await products.findOne({ _id: req.body.idProduct });
    //             const quanlity = Number(req.body.quanlity);
    //             if (product.quanlity < quanlity) {
    //                 return res.send({ message: "Out of stock" });
    //             }
    //             const order = await orders.findOne({ _id: req.body.idOrder });
    //             order.total += product.price * quanlity;
    //             const detailOrder = new detailOrders({ idOrder: req.body.idOrder, idProduct: req.body.idProduct, price: product.price , quanlity: quanlity });
    //             await detailOrder.save();
    //             const updateOrder = await orders.updateOne({ _id: req.body.idOrder }, { total: order.total, lastUpdate: Date.now() })
    //             const updateProduct = await products.updateOne( {_id: req.body.idProduct }, { saled: product.saled + quanlity, quanlity: product.quanlity - quanlity });
    //             res.send({ message: "Add Success" });
    //         }
    //         catch {
    //             res.send({ message: "Add Fail" });
    //         }
    //     }
    // };

    // bill () {
    //     return async (req, res) => {
    //         try {
    //             req.isBill = true;
    //             const updateDetail = await orders.updateOne({ _id: req.params.id}, { isBill: true, lastUpdate: Date.now() });
    //             res.send({ message: "Success Billing" })
    //         }
    //         catch {
    //             res.send({ message: "Billing Fail"});
    //         }
    //     }
    // }
};

export default orderController;