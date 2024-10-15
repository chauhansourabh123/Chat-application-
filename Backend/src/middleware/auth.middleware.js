import ApiError from "../utility/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return next(new ApiError(401, "Token is missing or invalid."));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!decodedToken) {
      return next(402, "Invalid token");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -token"
    );

    if (!user) {
      return next(new ApiError(404, "User not found. Try again"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(500, "An error occurred during authentication."));
  }
};

export default authUser;
