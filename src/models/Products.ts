import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  nameProduct: { type: String, required: true },
  color:   { type: String, required: true },
  mic: { type: Boolean, required: true },
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  quanlity: { type: Number, 'default': 0 , required: true },
  saled: { type: Number, 'default': 0, required: true },
  price: { type: Number, required: true },
  createOn: { type: Date, 'default': Date.now }
}, {versionKey: false});

const Product = mongoose.model('Product', ProductSchema)
export default Product;