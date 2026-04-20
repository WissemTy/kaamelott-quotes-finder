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
      className="h-100 text-center quotes-card"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '4px solid var(--border-off)',
        borderRadius: '8px',
        transition: 'border-color 0.3s',
        boxShadow: 'var(--shadow)',
      }}>

      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Text
          className="flex-grow-1 d-flex align-items-center justify-content-center"
          style={{ color: 'var(--text)', minHeight: '120px' }}>
          "{quote}"
        </Card.Text>

        <div className="text-center my-3" style={{ color: 'var(--gold)' }}> ✦ </div>

        <div>
          <p className="mb-1" style={{ color: 'var(--gold)' }}>{character}</p>
          <p className="mb-0 small" style={{ color: 'var(--sous-text)' }}>
            {episode} • {season}
          </p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default QuoteCard