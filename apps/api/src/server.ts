import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { env } from './env.js';
import { requireAuth, type AuthedRequest } from './authMiddleware.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({
    uid: req.user?.uid ?? null,
    email: req.user?.email ?? null,
  });
});

app.listen(env.PORT, () => {
  console.log(`SpellPod API listening on http://localhost:${env.PORT}`);
});
