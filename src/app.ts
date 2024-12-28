import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './module/user/user.router';

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import blogRouter from './module/blog/blog.router';
import authRouter from './module/auth/auth.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/admin', userRouter);
app.use('/api/blogs', blogRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is Live 💥',
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
