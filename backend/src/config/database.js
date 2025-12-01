import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      `MongoDB connected: ${connectInstance.connection.host}/${connectInstance.connection.name}`
    );  
  }
    catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDatabase; 