import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  nameCategory: { type: String, trim:true, required: [true, "nameCategory is required"] },
  brand: { type: String, trim:true, required: [true, "brand is required"] },
  createOn: { type: Date, "default": Date.now }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;