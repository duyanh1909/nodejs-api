import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
	total : { type: Number, required: true },
	createdOn: { type: Date, 'default': Date.now },
	isBill: { type: Boolean, 'default': false, required: true },
	lastUpdate: { type: Date, 'default': Date.now}
}, {versionKey: false});

const Orders = mongoose.model('Order', OrderSchema)
export default Orders;