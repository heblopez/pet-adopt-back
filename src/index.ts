import cors from 'cors';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import { HOSTNAME, PORT } from './config';
import authRouter from './routes/auth.routes';
import petsRouter from './routes/pets.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const welcomeListener = (_req: Request, res: Response) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .send(
      `<h1>Pet Adopt API 🐾</h1>
      <p>This is the backend of the Pet Adopt application.</p>`
    );
};

app.get('/', welcomeListener);
app.use('/api', authRouter);
app.use('/api', petsRouter);

app.listen(PORT, () => {
  console.log(`Pet Adopt API is running on http://${HOSTNAME}:${PORT}`);
});

export default app;
