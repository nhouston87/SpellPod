import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { env } from './env.js';
import { authRouter } from './routes/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.use('/health', healthRouter);
app.use('/auth', authRouter);

app.listen(env.PORT, () => {
  console.log(`SpellPod API listening on http://localhost:${env.PORT}`);
});
