import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

const generateRefreshToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    res.json({ token, refreshToken });
  } catch (err) {
    res.status(400).json({ message: 'Signup failed', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  res.json({ token, refreshToken });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as any;
    const token = generateToken(payload.userId);
    res.json({ token });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
