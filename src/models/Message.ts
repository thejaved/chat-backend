import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  content: string;
  createdAt: Date;
  read: boolean;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  read: { type: Boolean, default: false },
});

export const Message = model<IMessage>('Message', messageSchema);
