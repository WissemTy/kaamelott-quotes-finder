import { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import type { Citation } from '../types'

interface QuoteModalProps {
  quote: Citation | null
  onHide: () => void
  isFavorite: boolean
  onToggleFavorite: (citation: Citation) => void
}

function QuoteModal({ quote, onHide, isFavorite, onToggleFavorite }: QuoteModalProps) {
  const [fantasyMode, setFantasyMode] = useState(false)

  const picUrl = quote ? `/api/personnage/${encodeURIComponent(quote.infos.personnage)}/pic` : ''

  useEffect(() => {
    document.title = quote ? `Citation de ${quote.infos.personnage}` : 'Kaamelott Quotes'
  }, [quote])

  return (
    <Modal show={!!quote} onHide={onHide} centered size="xl" contentClassName="border-0 bg-transparent">
      <Modal.Body className="p-5 quote-modal-body">
        {quote && (
          <>
            <div className="d-flex justify-content-end gap-2 mb-4">
              <Button size="sm"
                className={`btn-favorite ${isFavorite ? 'is-active' : ''}`}
                onClick={() => onToggleFavorite(quote)} >
                {isFavorite ? '★ Favori' : '☆ Ajouter aux favoris'}
              </Button>
              
              <Button size="sm"
                className={`btn-fantasy ${fantasyMode ? 'fantasy-active' : ''}`}
                onClick={() => setFantasyMode(!fantasyMode)} >
                {fantasyMode ? '✦ Mode Médiéval' : '✦ Mode Normal'}
              </Button>
            </div>

            <div className="d-flex gap-4 align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={picUrl} alt={quote.infos.personnage}
                  className="quote-portrait"
                  onError={e => (e.currentTarget.style.display = 'none')} />
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