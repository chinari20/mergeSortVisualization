import { OAuth2Client } from "google-auth-library";
import { User as userModel } from "../models/user/user.model.js";
import jwt from "jsonwebtoken";

const oAuthClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        status: "BAD_REQUEST",
        message: "Google token not found",
      });
    }

    let ticket;
    try {
      ticket = await oAuthClient.verifyIdToken({
        idToken: token,
        audience: [
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_ID_LOCAL,
        ],
      });
    } catch (err) {
      console.error("Error validating Google token:", err.message);
      return res.status(401).json({
        status: "UNAUTHORIZED",
        message: "Invalid Google token",
      });
    }

    const { email, picture, given_name: firstName, family_name: lastName } =
      ticket.getPayload();

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name: `${firstName} ${lastName ?? ""}`.trim(),
        email,
        avatar: picture,
        role: "user",
      });
    }

    const userToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", userToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      status: "SUCCESS",
      message: "Login Successful",
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: userToken,
      },
    });
  } catch (error) {
    console.error("loginWithGoogle error:", error.message);
    return res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
