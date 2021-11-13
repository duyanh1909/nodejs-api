import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
	total : Number,
	createdOn: { type: Date, 'default': Date.now },
	isBill: { type: Boolean, 'default': false},
	lastUpdate: { type: Date, 'default': Date.now}
}, {versionKey: false});

const Orders = mongoose.model('Order', OrderSchema)
export default Orders;