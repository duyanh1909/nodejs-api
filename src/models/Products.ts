import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  nameProduct: String,
  color:   String,
  mic: Boolean,
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  quanlity: { type: Number, 'default': 0 },
  saled: { type: Number, 'default': 0 },
  price: Number,
  createOn: { type: Date, 'default': Date.now }
}, {versionKey: false});

const Product = mongoose.model('Product', ProductSchema)
export default Product;