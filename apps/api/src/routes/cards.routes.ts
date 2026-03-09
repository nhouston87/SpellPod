import { Router } from 'express';
import { searchScryfallCards } from '../services/scryfall.service.js';

export const cardsRouter = Router();

cardsRouter.get('/search', async (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';
  const typeLine = typeof req.query.typeLine === 'string' ? req.query.typeLine : '';
  const oracleText = typeof req.query.oracleText === 'string' ? req.query.oracleText : '';
  const manaCost = typeof req.query.manaCost === 'string' ? req.query.manaCost : '';
  const power = typeof req.query.power === 'string' ? req.query.power : '';
  const toughness = typeof req.query.toughness === 'string' ? req.query.toughness : '';
  const colorMode = typeof req.query.colorMode === 'string' ? req.query.colorMode : '';
  const colorsRaw = typeof req.query.colors === 'string' ? req.query.colors : '';
  const setCode = typeof req.query.set === 'string' ? req.query.set : '';
  const rarity = typeof req.query.rarity === 'string' ? req.query.rarity : '';
  const layout = typeof req.query.layout === 'string' ? req.query.layout : '';

  if (
    !q.trim() &&
    !typeLine.trim() &&
    !oracleText.trim() &&
    !manaCost.trim() &&
    !power.trim() &&
    !toughness.trim() &&
    !colorsRaw.trim() &&
    !setCode.trim() &&
    !rarity.trim() &&
    !layout.trim() 
  ) {
    res.status(400).json({ error: 'Provide q or at least one filter parameter' });
    return;
  }

  try {
    const scryfallQueryParts: string[] = [];

    if (q.trim()) scryfallQueryParts.push(q.trim());
    if (typeLine.trim()) scryfallQueryParts.push(`t:${typeLine.trim()}`);
    if (oracleText.trim()) scryfallQueryParts.push(`o:${oracleText.trim()}`);
    if (manaCost.trim()) scryfallQueryParts.push(`mana:{${manaCost.trim()}}`);
    if (power.trim()) scryfallQueryParts.push(`pow=${power.trim()}`);
    if (toughness.trim()) scryfallQueryParts.push(`tou=${toughness.trim()}`);
    if (setCode.trim()) scryfallQueryParts.push(`set:${setCode.trim().toLowerCase()}`);
    if (rarity.trim()) scryfallQueryParts.push(`rarity:${rarity.trim().toLowerCase()}`);
    if (layout.trim()) scryfallQueryParts.push(`layout:${layout.trim().toLowerCase()}`);


    const colors = colorsRaw
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => ['W', 'U', 'B', 'R', 'G', 'C'].includes(c));

    if (colors.length > 0) {
      const joined = colors.join('');
      if (colorMode === 'exact') {
        scryfallQueryParts.push(`c=${joined}`);
      } else if (colorMode === 'includes') {
        scryfallQueryParts.push(`c>=${joined}`);
      } else {
        // default commander identity behavior
        scryfallQueryParts.push(`id<=${joined}`);
      }
    }

    const compiledQuery = scryfallQueryParts.join(' ');
    const result = await searchScryfallCards(compiledQuery);
    res.json(result);
  } catch (error) {
    console.error('Card search failed', error);
    res.status(502).json({ error: 'Failed to fetch cards from Scryfall' });
  }
});
