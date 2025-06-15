// src/controllers/authController.js

import User from '../models/user.js';
import { generateToken, comparePassword, hashPassword } from '../utils/authUtils.js';
import Admin from '../models/admin.js';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password, role  } = req.body;
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      res.status(400).json({ message: 'User already exists with this phoneNumber.' });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      role
    });
    if (role === 'Admin') {
      await Admin.create({ userId: newUser._id });
    } 
    res.status(200).json({
      message: 'Registered successfully. Now you can log in.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      res.status(400).json({ message: 'Invalid phoneNumber or password.' });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid phoneNumber or password.' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({ token, message: 'Logged in successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user?.id;

//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       res.status(404).json({ message: 'Profile not found' });
//       return;
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//     });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Server error while fetching profile' });
//   }
// };
export const getUserProfile = async (req, res) => {
  console.log("🧪 Profile route hit");
  console.log("🔐 Authenticated user:", req.user);

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};
