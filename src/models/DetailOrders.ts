import mongoose from 'mongoose';
const { Schema } = mongoose;

const detailOrderSchema = new mongoose.Schema({
	productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        trim:true, 
        required: [true, "productId is required"]
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        trim:true,
        required: [true, "orderId is required"]
    },
    quantity: { type: Number, required: [true, "quantity is required"] },
    price: { type: Number, required: [true, "price is required"] },
    createdOn: { type: Date, 'default': Date.now },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

detailOrderSchema.virtual('product', {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
});

detailOrderSchema.virtual('order', {
    ref: "Order",
    localField: "orderId",
    foreignField: "_id",
});

const detailOrders = mongoose.model('DetailOrder', detailOrderSchema)
export default detailOrders;