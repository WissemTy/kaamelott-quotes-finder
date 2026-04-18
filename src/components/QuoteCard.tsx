import { Card } from 'react-bootstrap'

interface QuoteCardProps {
  quote: string
  character: string
  episode: string
  season: string
}

function QuoteCard({ quote, character, episode, season }: QuoteCardProps) {
  return (
    <Card
      className="h-100 text-center"
      style={{
        backgroundColor: '#16213e',
        border: '4px solid rgba(201, 168, 76, 0.3)',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.6)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.3)')}
    >
      <Card.Body className="d-flex flex-column justify-content-between">

        {/* Citation */}
        <Card.Text
          className="flex-grow-1 d-flex align-items-center justify-content-center"
          style={{ color: '#e8e8e8', minHeight: '120px' }}
        >
          "{quote}"
        </Card.Text>

        {/* Séparateur */}
        <div className="text-center my-3" style={{ color: 'var(--gold)' }}>
          ✦
        </div>

        {/* Infos */}
        <div>
          <p className="mb-1" style={{ color: '#928c2f' }}>{character}</p>
          <p className="mb-0 small" style={{ color: '#888' }}>
            {episode} • {season}
          </p>
        </div>

      </Card.Body>
    </Card>
  )
}

export default QuoteCard