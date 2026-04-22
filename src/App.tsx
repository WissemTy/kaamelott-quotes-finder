import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import type { Citation, ApiResponse } from './types'
import Header from './components/Header'
import QuoteCard from './components/QuoteCard'
import FilterPanel from './components/FilterPanel'
import QuoteModal from './components/QuoteModal'
import useFavorites from './hooks/useFavorites'
import InfoModal from './components/InfoModal'

const ITEMS_PER_PAGE = 18

function App() {
  const [quotes, setQuotes] = useState<Citation[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Citation | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { favorites, addFavorite, removeFavorite, isFavorite, clearFavorites } = useFavorites()
  
  const displayedQuotes = showFavorites ? favorites : quotes
  const totalPages = Math.ceil(displayedQuotes.length / ITEMS_PER_PAGE)
  const currentQuotes = displayedQuotes.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)


  const fetchQuotes = (personnage = '', livre = '', auteur = '') => {
    setQuotes([])
    setError(null)
    setLoading(true)
    setPage(1)

    let url = '/api/all'

    if (livre && personnage) {
      url = `/api/all/livre/${livre}/personnage/${encodeURIComponent(personnage)}`
    } else if (livre) {
      url = `/api/all/livre/${livre}`
    } else if (personnage) {
      url = `/api/all/personnage/${encodeURIComponent(personnage)}`
    } else if (auteur) {
      url = `/api/all/auteur/${encodeURIComponent(auteur)}`
    }

    fetch(url)
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if (data.status === 1 && Array.isArray(data.citation) && data.citation.length > 0) {
          setQuotes(data.citation)
        } else if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setQuotes([data.citation])
        } else {
          setQuotes([])
          setError("Aucune citation trouvée pour ces filtres")
        }
      })
      .catch(() => setError("Impossible de contacter l'API"))
      .finally(() => setLoading(false))
  }

  const fetchRandomQuote = () => {
    setError(null)
    setLoading(true)
    fetch('/api/random')
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setSelectedQuote(data.citation)
        } else {
          setError('Erreur lors de la récupération de la citation')
        }
      })
      .catch(() => setError("Impossible de contacter l'API"))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const toggleFavorite = (citation: Citation) => {
    if (isFavorite(citation)) {
      removeFavorite(citation)
    } else {
      addFavorite(citation)
    }
  }

  return (
    <>
      <InfoModal
        show={showInfo}
        onHide={() => setShowInfo(false)}
        totalQuotes={quotes.length}
        favoritesCount={favorites.length}
        onClearFavorites={clearFavorites}
      />
      <Header
        onRandomQuote={fetchRandomQuote}
        onShowFilters={() => setShowFilters(true)}
        onReset={() => { setShowFavorites(false); fetchQuotes() }}
        onShowInfo={() => setShowInfo(true)}
        onShowFavorites={() => { setShowFavorites(f => !f); setPage(1) }}
        showFavorites={showFavorites}
        favoritesCount={favorites.length}
      />
      <QuoteModal
        quote={selectedQuote}
        onHide={() => setSelectedQuote(null)}
        isFavorite={selectedQuote ? isFavorite(selectedQuote) : false}
        onToggleFavorite={toggleFavorite}
      />
      <FilterPanel
        show={showFilters}
        onHide={() => setShowFilters(false)}
        onApply={(personnage, livre, auteur) => { fetchQuotes(personnage, livre, auteur); setShowFavorites(false) }}
      />

      <Container className="mt-4">
        {showFavorites && (
          <p className="text-center mb-4" style={{ color: 'var(--gold)' }}>
            ★ {favorites.length} citation{favorites.length > 1 ? 's' : ''} en favori
          </p>
        )}
        {error && !showFavorites && (
          <p className="text-center mt-5" style={{ color: 'var(--gold)', fontSize: '1.2rem' }}> {error} </p>
        )}
        {/* {loading && !showFavorites && (<p className="text-center" style={{ color: 'var(--gold)' }}>Chargement...</p>)} */}
        {showFavorites && favorites.length === 0 && (
          <p className="text-center mt-5" style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>
            ☆ Aucun favori pour l'instant...
          </p>
        )}
        <Row className="g-4">
          {currentQuotes.map((q, index) => (
            <Col key={index} xs={12} md={6} lg={4} onClick={() => setSelectedQuote(q)} style={{ cursor: 'pointer' }}>
              <QuoteCard
                quote={q.citation}
                character={q.infos.personnage}
                episode={q.infos.episode}
                season={q.infos.saison}
              />
            </Col>
          ))}
        </Row>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center gap-2 my-4">
            <button className="btn btn-outline-warning btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Précédent
            </button>
            <span className='color-gold'>Page {page} / {totalPages}</span>
            <button className="btn btn-outline-warning btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Suivant
            </button>
          </div>
        )}
      </Container>
    </>
  )
}

export default App