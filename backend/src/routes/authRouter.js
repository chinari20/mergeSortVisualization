
import express from "express";
import { loginWithGoogle } from "../controllers/authController.js";

const router = express.Router();

router.post("/google-login", loginWithGoogle);

export default router;
