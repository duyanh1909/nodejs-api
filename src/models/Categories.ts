import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
  nameCategory: { type: String, required: true },
  createOn: { type: Date, "default": Date.now }
}, {versionKey: false});

const Category = mongoose.model('Category', CategorySchema);
export default Category;