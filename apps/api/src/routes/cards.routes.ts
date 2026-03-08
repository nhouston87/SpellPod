import { Router } from 'express';
import { searchScryfallCards } from '../services/scryfall.service.js';

export const cardsRouter = Router();

cardsRouter.get('/search', async (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';

  if (!q.trim()) {
    res.status(400).json({ error: 'Missing required query parameter: q' });
    return;
  }

  try {
    const result = await searchScryfallCards(q);
    res.json(result);
  } catch (error) {
    console.error('Card search failed', error);
    res.status(502).json({ error: 'Failed to fetch cards from Scryfall' });
  }
});
