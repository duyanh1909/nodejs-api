require('dotenv').config();
import express from 'express';
import src from './src';
import mongoose from 'mongoose';

const app = express();
const port = "3000";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);

    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
connectDB()

app.use("/", src);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});