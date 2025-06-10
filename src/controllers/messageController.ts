import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const createMessage = async (req: Request, res: Response) => {
  const { recipient, content } = req.body;
  const sender = (req as any).user.userId;
  const message = await Message.create({ sender, recipient, content });
  res.status(201).json(message);
};

export const getMessages = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const messages = await Message.find({
    $or: [{ sender: userId }, { recipient: userId }],
  }).sort({ createdAt: -1 });
  res.json(messages);
};
