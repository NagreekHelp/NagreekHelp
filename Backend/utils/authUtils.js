
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { 
      id: userId,
      role: role 
    }, 
    process.env.JWT_SECRET || 'your_jwt_secret', 
    {
      expiresIn: '30d',
    }
  );
};

export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
