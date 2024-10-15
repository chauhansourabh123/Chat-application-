import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

if (!process.env.CORS_ORIGIN) {
  console.error("CORS_ORIGIN is not defined in .env");
  process.exit(1);
}

const app = express();
const users = {};
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
}

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    io.emit("getOnline", Object.keys(users));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
import userRouter from "./src/routes/user.route.js";
import messageRouter from "./src/routes/message.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

app.use((err, req, res, next) => {
  const { status, message, data } = err;
  return res.status(status || 500).json({
    success: false,
    message: message || "Internal server error.",
    data: data || null,
  });
});

export { app, io, server, getReceiverSocketId };
