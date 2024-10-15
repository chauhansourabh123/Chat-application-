import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import ApiResponse from "../utility/ApiResponse.js";
import Chat from "../model/chat.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../../app.js"

const sendMessage = asyncHandler(async (req, res, next) => {
  try {
    const { id: receiverId } = req.params; // Receiver's user ID
    const senderId = req.user._id; // Logged-in user's ID
    const { message } = req.body; // Message content

    if (!message) {
      return next(new ApiError(400, "Message content is required."));
    }

    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        members: [senderId, receiverId],
      });
    }

    // Create and save the new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();

    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, newMessage, "Message sent successfully", true)
      );
  } catch (error) {
    console.error(error); // Log error for debugging
    next(new ApiError(500, "Unable to send message. Try again."));
  }
});

const getMessage = asyncHandler(async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!chat) {
      return res
        .status(201)
        .json(new ApiResponse(201, [], "Chat is empty", true));
    }

    const messages = chat.messages;
    return res
      .status(201)
      .json(
        new ApiResponse(201, messages, "Message fetched successfully", true)
      );
  } catch (error) {
    next(error);
  }
});

export { sendMessage, getMessage };
