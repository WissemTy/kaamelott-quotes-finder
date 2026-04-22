import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import type { Citation } from '../types'

interface QuoteModalProps {
  quote: Citation | null
  onHide: () => void
}

function QuoteModal({ quote, onHide }: QuoteModalProps) {
  const [fantasyMode, setFantasyMode] = useState(false)

  const picUrl = quote ? `/api/personnage/${encodeURIComponent(quote.infos.personnage)}/pic` : ''

  useEffect(() => {
    if (quote) {
      document.title = `Citation de ${quote.infos.personnage}`
    } else {
      document.title = 'Kaamelott Quotes'
    }
  }, [quote])

  return (
    <Modal show={!!quote} onHide={onHide} centered size="xl" contentClassName="border-0 bg-transparent">
      <Modal.Body className="p-5 quote-modal-body">
        {quote && (
          <>
            <div className="d-flex justify-content-end mb-3">
              <Button
                size="sm"
                className={`btn-fantasy ${fantasyMode ? 'fantasy-active' : ''}`}
                onClick={() => setFantasyMode(!fantasyMode)}
              >
                {fantasyMode ? '✦ Mode Médiéval' : '✦ Mode Normal'}
              </Button>
            </div>

            <div className="d-flex gap-4 align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={picUrl}
                  alt={quote.infos.personnage}
                  className="quote-portrait"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              </div>

              <div className="flex-grow-1 text-center">
                <p className={`fst-italic mb-4 quote-text ${fantasyMode ? 'fantasy-font' : ''}`}>
                  "{quote.citation}"
                </p>

                <div className="text-gold">✦</div>

                <p className={`mt-3 mb-1 quote-character ${fantasyMode ? 'fantasy-font' : ''}`}>
                  {quote.infos.personnage}
                </p>

                <div className="quote-meta">
                  <p className="mb-0">{quote.infos.episode} • {quote.infos.saison}</p>
                  <p className="mt-1">Acteur : {quote.infos.acteur} — Auteur : {quote.infos.auteur}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default QuoteModal