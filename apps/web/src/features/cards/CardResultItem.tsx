import type { CardSearchItem } from './types.js';

type CardResultItemProps = {
  card: CardSearchItem;
};

export function CardResultItem({ card }: CardResultItemProps) {
  return (
    <li style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.75rem' }}>
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
  );
}
