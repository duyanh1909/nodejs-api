import mongoose from 'mongoose';
const { Schema } = mongoose;

const DetailOrderSchema = new mongoose.Schema({
	idProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    idOrder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    quanlity: Number,
    price: Number,
    createdOn: { type: Date, 'default': Date.now },
	lastUpdate: { type: Date, 'default': Date.now}
}, {versionKey: false});

const detailOrders = mongoose.model('DetailOrder', DetailOrderSchema)
export default detailOrders;