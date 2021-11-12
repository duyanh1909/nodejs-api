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
  price: Number,
}, {versionKey: false});

const Product = mongoose.model('Product', ProductSchema)
export default Product;