import { User } from "../models/user.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import createHttpError from "http-errors";

// export const userController = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   res.status(200).json({message: 'Password reset email sent successfully'});
// }

export const updateUserAvatar = async (req, res, next) => {

  if (!req.file) {
    next(createHttpError(400, 'No file'));
    return;
  }
  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
}
