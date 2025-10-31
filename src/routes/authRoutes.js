
import { Router } from "express";
import { celebrate } from "celebrate";
import { loginUserSchma, registerUserSchma } from "../validations/authValidation.js";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/register', celebrate(registerUserSchma), registerUser);
router.post('/auth/login', celebrate(loginUserSchma), loginUser)

export default router;
