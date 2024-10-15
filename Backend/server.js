import dotenv from "dotenv";
import connectDB from "./src/database/index.js";
import { app, io, server } from "./app.js";
dotenv.config();

// function for starting the server.
const startServer = async () => {
  const PORT = process.env.PORT || 4000;
  
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log("This app is running on the port of " + PORT);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

// Run the function to start the server.
startServer();
