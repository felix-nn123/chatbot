import express from 'express';
import type { Request, Response } from 'express';
import { chatControllers } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';

const routerChat = express.Router();
const routerSummary = express.Router();

routerChat.post('/chat', chatControllers.sendmessage);

routerChat.get('/', (req: Request, res: Response) => {
   res.send({ message: 'Hello World!!' });
});

routerSummary.get('/:id/reviews', reviewController.getReviews);
routerSummary.post('/:id/reviews/summarize', reviewController.summarizeReviews);

export { routerChat, routerSummary };
