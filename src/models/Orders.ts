import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
	total : { type: Number, "default": 0, required: true },
	createdOn: { type: Date, "default": Date.now },
	isBill: { type: Boolean, "default": true, required: true },
});

const Orders = mongoose.model('Order', orderSchema)
export default Orders;