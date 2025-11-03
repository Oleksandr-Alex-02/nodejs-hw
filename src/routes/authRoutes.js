
import { Router } from "express";
import { celebrate } from "celebrate";
import { loginUserSchma, registerUserSchma } from "../validations/authValidation.js";
import { loginUser, logoutUser, refreshUserSession, registerUser } from "../controllers/authController.js";

const router = Router();

router.post('/auth/register', celebrate(registerUserSchma), registerUser);
router.post('/auth/login', celebrate(loginUserSchma), loginUser)
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);

export default router;
