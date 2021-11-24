import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		trim:true,
		required: [true, "userId is required"]
	  },
	total : { type: Number, "default": 0, required: true },
	createdOn: { type: Date, "default": Date.now },
	isBill: { type: Boolean, "default": true, required: true },
});

const Orders = mongoose.model('Order', orderSchema)
export default Orders;