import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
  try {
    // 1. Parse the request body (main data)
    const { username, email, password } = req.body;

    // 2. Do Data Validations
    // Check if all fields have valid inputs
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are important!' });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // 3. Create User
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: 'User registered succesffuly!',
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const loginUser = async (req, res) => {
  try {
    // 1. Parse the request body (main data)
    const { email, password } = req.body;

    // 2. Do Data Validations
    // Check if all fields have valid inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are important!' });
    }

    // Check if user even exists (in our database)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'User not found.' });

    // Compare the provided password with the stored password (of the user in the database)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    // 3. Authenticate user
    res.status(200).json({
      message: 'User logged in.',
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

const logoutUser = async (req, res) => {
  try {
    // 1. Parse the request body (main data)
    const { email } = req.body;

    // 2. Find the user (in our database)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // 3. Unauthenticate user
    res.status(204).json({ message: 'Logout successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export { registerUser, loginUser, logoutUser };
