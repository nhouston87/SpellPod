export type SearchContext = 'global' | 'collection';

export type ColorSymbol = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';
export type ColorMode = 'exact' | 'includes' | 'commanderIdentity';

export type SearchLayout =
  | 'split'
  | 'flip'
  | 'transform'
  | 'modal_dfc'
  | 'adventure'
  | 'meld'
  | 'leveler'
  | 'saga';

export type CardSearchFilters = {
  typeLine: string;
  oracleText: string;
  manaCost: string;
  power: string;
  toughness: string;
  colorMode: ColorMode;
  colors: ColorSymbol[];
  setCode: string;
  rarity: string;
  layout: SearchLayout | '';
  onlyInCollection: boolean;
  inUse: boolean;
  notInUse: boolean;
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
