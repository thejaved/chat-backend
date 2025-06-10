import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/messageController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post('/', verifyToken, createMessage);
router.get('/', verifyToken, getMessages);

export default router;
