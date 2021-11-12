import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id:  Number,
  nameProduct: String,
  color:   String,
  mic: Boolean,
  idCategory: {
    type: String,
    ref: 'Category',
  },
  price: Number,
}, {versionKey: false});

const Product = mongoose.model('Product', ProductSchema)
export default Product;