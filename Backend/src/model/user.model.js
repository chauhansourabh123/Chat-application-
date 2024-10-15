import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hashed the user password.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// compare the user password.
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.EXPIRY_TOKEN,
  });
};

// Create the User model using the userSchema
const User = mongoose.model("User", userSchema);

export default User;
