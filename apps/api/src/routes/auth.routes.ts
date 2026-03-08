import { Router } from 'express';
import { requireAuth, type AuthedRequest } from '../middleware/requireAuth.js';

export const authRouter = Router();

authRouter.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({
    uid: req.user?.uid ?? null,
    email: req.user?.email ?? null,
  });
});
