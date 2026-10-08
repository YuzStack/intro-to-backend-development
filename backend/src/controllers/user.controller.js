import { User } from "../models/user.model";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Do Basic Validations
    // Check if all fields have valid inputs
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // 2. Create User
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User registered succesffuly!",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { registerUser };
