import mongoose from "mongoose";

const connectDB = async () => {
  const URI = `${process.env.MONGODB_URI}/chatapp`;
  try {
    const instance = await mongoose.connect(URI);
    console.log("Database connected successfully", instance.connection.host);
  } catch (error) {
    console.error("Database connection error", error);
  }
};

export default connectDB;
