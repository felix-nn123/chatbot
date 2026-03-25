import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { routerChat, routerSummary } from './routes';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api', routerChat);
app.use('/api/products', routerSummary);

app.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
});
