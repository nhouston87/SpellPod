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
