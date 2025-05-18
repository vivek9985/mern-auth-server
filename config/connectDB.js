// import mongoose from "mongoose";

// mongoose.set("bufferCommands", false);

// const connectDB = async () => {
//   try {
//     await mongoose
//       .connect(process.env.DB_URI)
//       .then(() => {
//         console.log("Database is connected! 👻");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database is connected! 👻");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
