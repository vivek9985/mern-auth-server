import mongoose from "mongoose";
const DBport = process.env.DB_URI;

const connectDB = () => {
  try {
    mongoose
      .connect(DBport)
      .then(() => {
        console.log("Database is connected! 👻");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
