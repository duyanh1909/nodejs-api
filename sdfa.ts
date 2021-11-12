    // update() {
    //     return async (req, res) => {
    //         try {
    //             const product = await products.findOne({_id: req.body.idProduct});
    //             const price = product.price;
    //             const detailOrder = await detailOrders.updateOne({ _id: req.body.id}, {idProduct: req.body.idProduct, idOrder: req.body.idOrder, price: price});
    //             const detail = await detailOrders.find({idOrder: req.body.idOrder});
    //             const total = this.totalPriceOrder(detail)
    //             const order = await orders.updateOne({ _id: req.body.idOrder}, {total: total});
    //             res.send({message: "Update Success"});
    //         }
    //         catch {
    //             res.send({ message: "Update Fail"});
    //         }
    //     }
    // }