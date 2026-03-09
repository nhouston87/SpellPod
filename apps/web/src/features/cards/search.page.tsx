import { FormEvent, useState } from 'react';
import { apiGet } from '../../api/client.js';
import { apiRoutes } from '../../api/routes.js';
import { CardResultItem } from './CardResultItem.js';
import type {
  CardSearchFilters,
  CardSearchItem,
  CardSearchResult,
  ColorMode,
  ColorSymbol,
  SearchContext,
} from './types.js';

const colorOptions: ColorSymbol[] = ['W', 'U', 'B', 'R', 'G', 'C'];

const rarityOptions = ['common', 'uncommon', 'rare', 'mythic'] as const;

const layoutOptions = [
  { value: 'split', label: 'Split' },
  { value: 'flip', label: 'Flip' },
  { value: 'transform', label: 'Transform' },
  { value: 'modal_dfc', label: 'Modal DFC' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'meld', label: 'Meld' },
  { value: 'leveler', label: 'Leveler' },
  { value: 'saga', label: 'Saga' },
] as const;

const initialFilters: CardSearchFilters = {
  typeLine: '',
  oracleText: '',
  manaCost: '',
  power: '',
  toughness: '',
  colorMode: 'commanderIdentity',
  colors: [],
  setCode: '',
  rarity: '',
  layout: '',
  onlyInCollection: false,
  inUse: false,
  notInUse: false,
};


export function SearchPage() {
  const [searchContext, setSearchContext] = useState<SearchContext>('global');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<CardSearchFilters>(initialFilters);

  const [results, setResults] = useState<CardSearchItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function resetResults() {
    setResults([]);
    setHasMore(false);
    setNextPage(null);
    setError(null);
  }

  function onContextChange(next: SearchContext) {
    setSearchContext(next);
    resetResults();
  }

  function updateFilter<K extends keyof CardSearchFilters>(key: K, value: CardSearchFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function toggleColor(color: ColorSymbol) {
    setFilters((prev) => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
      };
    });
  }

  function updateColorMode(mode: ColorMode) {
    setFilters((prev) => ({ ...prev, colorMode: mode }));
  }


  async function runSearch(e: FormEvent) {
    e.preventDefault();

    if (searchContext === 'collection') {
      resetResults();
      return;
    }

    const hasAnyInput =
      query.trim() ||
      filters.typeLine.trim() ||
      filters.oracleText.trim() ||
      filters.manaCost.trim() ||
      filters.power.trim() ||
      filters.toughness.trim() ||
      filters.setCode.trim() ||
      filters.rarity.trim() ||
      filters.layout.trim() ||
      filters.colors.length > 0;


    if (!hasAnyInput) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiGet<CardSearchResult>(apiRoutes.cardsSearch, {
        params: {
          q: query.trim() || undefined,
          typeLine: filters.typeLine.trim() || undefined,
          oracleText: filters.oracleText.trim() || undefined,
          manaCost: filters.manaCost.trim() || undefined,
          power: filters.power.trim() || undefined,
          toughness: filters.toughness.trim() || undefined,
          colorMode: filters.colors.length > 0 ? filters.colorMode : undefined,
          colors: filters.colors.length > 0 ? filters.colors.join(',') : undefined,
          set: filters.setCode.trim() || undefined,
          rarity: filters.rarity.trim() || undefined,
          layout: filters.layout || undefined,
        },
      });


      setResults(data.cards);
      setHasMore(data.hasMore);
      setNextPage(data.nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
      setHasMore(false);
      setNextPage(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>Card Search</h1>

      <section
        style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: 8,
        }}
      >
        <p style={{ marginTop: 0 }}>
          <strong>Search Context:</strong>{' '}
          {searchContext === 'global' ? 'Global (Scryfall)' : 'My Collection'}
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <label>
            <input
              type="radio"
              name="searchContext"
              value="global"
              checked={searchContext === 'global'}
              onChange={() => onContextChange('global')}
            />{' '}
            Global
          </label>

          <label>
            <input
              type="radio"
              name="searchContext"
              value="collection"
              checked={searchContext === 'collection'}
              onChange={() => onContextChange('collection')}
            />{' '}
            My Collection
          </label>
        </div>
      </section>

      <form onSubmit={runSearch} style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              searchContext === 'global'
                ? 'Search global cards (e.g. sol ring)'
                : 'Search your collection (coming soon)'
            }
            style={{ width: '320px' }}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <fieldset style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.75rem' }}>
          <legend>Filters (Slice 1)</legend>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: '0.5rem' }}>
            <label>
              Type Line
              <input
                type="text"
                value={filters.typeLine}
                onChange={(e) => updateFilter('typeLine', e.target.value)}
                placeholder="Creature"
              />
            </label>

            <label>
              Oracle Text
              <input
                type="text"
                value={filters.oracleText}
                onChange={(e) => updateFilter('oracleText', e.target.value)}
                placeholder="draw a card"
              />
            </label>

            <label>
              Mana Cost
              <input
                type="text"
                value={filters.manaCost}
                onChange={(e) => updateFilter('manaCost', e.target.value)}
                placeholder="1R"
              />
            </label>

            <label>
              Power
              <input
                type="text"
                value={filters.power}
                onChange={(e) => updateFilter('power', e.target.value)}
                placeholder="2"
              />
            </label>

            <label>
              Toughness
              <input
                type="text"
                value={filters.toughness}
                onChange={(e) => updateFilter('toughness', e.target.value)}
                placeholder="2"
              />
            </label>
            <label>
              Color Mode
              <select
                value={filters.colorMode}
                onChange={(e) => updateColorMode(e.target.value as ColorMode)}
              >
                <option value="exact">Exactly These Colors</option>
                <option value="includes">Includes These Colors</option>
                <option value="commanderIdentity">Commander Colors</option>
              </select>
            </label>

            <div>
              <p style={{ margin: '0.25rem 0' }}>Colors</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {colorOptions.map((color) => (
                  <label key={color} style={{ display: 'inline-flex', gap: '0.25rem', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => toggleColor(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <label>
              Set Code
              <input
                type="text"
                value={filters.setCode}
                onChange={(e) => updateFilter('setCode', e.target.value)}
                placeholder="dsk"
                maxLength={8}
              />
            </label>

            <label>
              Rarity
              <select
                value={filters.rarity}
                onChange={(e) => updateFilter('rarity', e.target.value)}
              >
                <option value="">Any</option>
                {rarityOptions.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Layout
              <select
                value={filters.layout}
                onChange={(e) => updateFilter('layout', e.target.value as CardSearchFilters['layout'])}
              >
                <option value="">Any</option>
                {layoutOptions.map((layout) => (
                  <option key={layout.value} value={layout.value}>
                    {layout.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>
        <fieldset style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.75rem' }}>
          <legend>Collection Filters (Coming Soon)</legend>
          <p style={{ marginTop: 0, color: '#666' }}>
            These require collection-backed search and will be enabled in a later epic.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <label>
              <input type="checkbox" checked={filters.onlyInCollection} disabled />
              {' '}Only In Collection
            </label>
            <label>
              <input type="checkbox" checked={filters.inUse} disabled />
              {' '}In Use
            </label>
            <label>
              <input type="checkbox" checked={filters.notInUse} disabled />
              {' '}Not In Use
            </label>
          </div>
        </fieldset>
      </form>

      {searchContext === 'collection' ? (
        <p style={{ color: '#555' }}>
          Collection search mode is selected. Collection-backed results will be added in a later
          story.
        </p>
      ) : null}

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      {!isLoading && !error && results.length === 0 && searchContext === 'global' ? (
        <p>No results yet. Try a query and/or filters.</p>
      ) : null}

      {searchContext === 'global' ? (
        <>
          <p>
            {results.length > 0 ? `Results: ${results.length}` : null}
            {hasMore ? ' (more available)' : ''}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {results.map((card) => (
              <CardResultItem key={card.id} card={card} />
            ))}
          </ul>

          {nextPage ? (
            <p style={{ marginTop: '1rem' }}>
              Next page URL available (pagination UI can be added in later slice).
            </p>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
