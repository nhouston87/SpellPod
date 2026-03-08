import { FormEvent, useState } from 'react';
import { apiGet } from '../api/client.js';
import { apiRoutes } from '../api/routes.js';

type CardSearchItem = {
  id: string;
  name: string;
  manaCost: string | null;
  typeLine: string | null;
  oracleText: string | null;
  imageSmall: string | null;
  imageNormal: string | null;
};

type CardSearchResult = {
  hasMore: boolean;
  nextPage: string | null;
  cards: CardSearchItem[];
};

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CardSearchItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiGet<CardSearchResult>(apiRoutes.cardsSearch, {
        params: { q: trimmed },
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
      <h1>Global Card Search</h1>

      <form onSubmit={runSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Scryfall (e.g. sol ring)"
          style={{ width: '320px' }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      {!isLoading && !error && results.length === 0 ? (
        <p>No results yet. Try a card name or text query.</p>
      ) : null}

      <p>
        {results.length > 0 ? `Results: ${results.length}` : null}
        {hasMore ? ' (more available)' : ''}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
        {results.map((card) => (
          <li key={card.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {card.imageSmall ? (
                <img src={card.imageSmall} alt={card.name} width={146} height={204} />
              ) : (
                <div
                  style={{
                    width: 146,
                    height: 204,
                    border: '1px dashed #999',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    color: '#666',
                  }}
                >
                  No image
                </div>
              )}

              <div>
                <h2 style={{ margin: '0 0 0.25rem' }}>
                  {card.name} {card.manaCost ? <span>({card.manaCost})</span> : null}
                </h2>
                <p style={{ margin: '0 0 0.5rem' }}>{card.typeLine ?? 'Unknown type'}</p>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {card.oracleText ? card.oracleText.slice(0, 280) : 'No oracle text'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {nextPage ? (
        <p style={{ marginTop: '1rem' }}>
          Next page URL available (pagination UI can be added in Story 3.3).
        </p>
      ) : null}
    </main>
  );
}
