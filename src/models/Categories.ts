import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  nameCategory: { type: String, required: true },
  brand: { type: String, required: true },
  createOn: { type: Date, "default": Date.now }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;