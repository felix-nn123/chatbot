import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req: Request, res: Response) => {
   res.send({ message: 'Hello World!!' });
});

app.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
});
