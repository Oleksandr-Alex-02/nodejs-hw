
import { Router } from "express";
import { celebrate } from "celebrate";
import { registerUserSchma } from "../validations/authValidation.js";
import { registerUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/register', celebrate(registerUserSchma), registerUser);

export default router;
