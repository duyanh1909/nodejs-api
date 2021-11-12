import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
  id:  String,
  nameCategory: String,
}, {versionKey: false});

const Category = mongoose.model('Category', CategorySchema);
export default Category;