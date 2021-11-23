import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  nameProduct: { type: String, required: [true, "nameProduct is required"] },
  color:   { type: String, required: [true, "color is required"] },
  mic: { type: Boolean, required: [true, "mic is required"] },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, "categoryId is required"]
  },
  price: { type: Number, required: [true, "price is required"] },
  createOn: { type: Date, 'default': Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.virtual('category', {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
});

const Product = mongoose.model('Product', productSchema)
export default Product;