import { User } from "../models/user.js";

export const userController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  res.status(200).json({message: 'Password reset email sent successfully'});
}
