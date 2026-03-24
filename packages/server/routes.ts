import express from 'express';
import type { Request, Response } from 'express';
import { chatControllers } from './controllers/chat.controller';

const routerChat = express.Router();

routerChat.post('/chat', chatControllers.sendmessage);

routerChat.get('/', (req: Request, res: Response) => {
   res.send({ message: 'Hello World!!' });
});

export default routerChat;
