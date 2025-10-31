
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { createSession } from "../services/auth.js";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

//Регістрація
export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await User.create({
    email,
    password: hashedPassword,
   });

  const newSession = await createSession(newUser._id);

  res.status(201).json(newUser);
};

//Login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(404, 'Invalid credentials'));
  };

    const isValidPassword = bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(createHttpError(401, 'Invalid credentials'));
  };

    await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);

  res.status(200).json(user);
};
