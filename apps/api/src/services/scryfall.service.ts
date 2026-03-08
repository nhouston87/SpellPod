import { env } from '../env.js';

type ScryfallCardFace = {
  name?: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  image_uris?: {
    small?: string;
    normal?: string;
  };
};

type ScryfallCard = {
  id: string;
  name: string;
  mana_cost?: string;
  type_line?: string;
  oracle_text?: string;
  image_uris?: {
    small?: string;
    normal?: string;
  };
  card_faces?: ScryfallCardFace[];
};

type ScryfallSearchResponse = {
  object: 'list';
  has_more: boolean;
  next_page?: string;
  data: ScryfallCard[];
};

export type CardSearchItem = {
  id: string;
  name: string;
  manaCost: string | null;
  typeLine: string | null;
  oracleText: string | null;
  imageSmall: string | null;
  imageNormal: string | null;
};

export type CardSearchResult = {
  hasMore: boolean;
  nextPage: string | null;
  cards: CardSearchItem[];
};

function pickFaceValue<T>(
  card: ScryfallCard,
  selector: (value: ScryfallCard | ScryfallCardFace) => T | undefined,
): T | null {
  const top = selector(card);
  if (top !== undefined) return top ?? null;

  if (card.card_faces?.length) {
    for (const face of card.card_faces) {
      const val = selector(face);
      if (val !== undefined) return val ?? null;
    }
  }

  return null;
}

function normalizeCard(card: ScryfallCard): CardSearchItem {
  const imageSmall =
    card.image_uris?.small ??
    card.card_faces?.find((f) => f.image_uris?.small)?.image_uris?.small ??
    null;

  const imageNormal =
    card.image_uris?.normal ??
    card.card_faces?.find((f) => f.image_uris?.normal)?.image_uris?.normal ??
    null;

  return {
    id: card.id,
    name: card.name,
    manaCost: pickFaceValue(card, (c) => c.mana_cost),
    typeLine: pickFaceValue(card, (c) => c.type_line),
    oracleText: pickFaceValue(card, (c) => c.oracle_text),
    imageSmall,
    imageNormal,
  };
}

export async function searchScryfallCards(query: string): Promise<CardSearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { hasMore: false, nextPage: null, cards: [] };
  }

  const url = new URL('/cards/search', env.SCRYFALL_BASE_URL);
  url.searchParams.set('q', trimmed);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 404) {
    return { hasMore: false, nextPage: null, cards: [] };
  }

  if (!response.ok) {
    throw new Error(`Scryfall search failed (${response.status})`);
  }

  const payload = (await response.json()) as ScryfallSearchResponse;

  return {
    hasMore: payload.has_more,
    nextPage: payload.next_page ?? null,
    cards: payload.data.map(normalizeCard),
  };
}
