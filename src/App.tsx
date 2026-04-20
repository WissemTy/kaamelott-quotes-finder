import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import type { Citation, ApiResponse } from './types'
import Header from './components/Header'
import QuoteCard from './components/QuoteCard'
import FilterPanel from './components/FilterPanel'

const ITEMS_PER_PAGE = 18

function App() {
  const [quotes, setQuotes] = useState<Citation[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

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
        if (data.status === 1 && Array.isArray(data.citation)) {
          setQuotes(data.citation)
        } else if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setQuotes([data.citation])
        } else {
          setError('Aucune citation trouvée')
        }
      })
      .catch(() => setError("Impossible de contacter l'API"))
      .finally(() => setLoading(false))
  }

  const fetchRandomQuote = () => {
    setQuotes([])
    setError(null)
    setLoading(true)
    fetch('/api/random')
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setQuotes([data.citation])
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

  const totalPages = Math.ceil(quotes.length / ITEMS_PER_PAGE)
  const currentQuotes = quotes.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <>
      <Header onRandomQuote={fetchRandomQuote} onShowFilters={() => setShowFilters(true)} />
      <FilterPanel
        show={showFilters}
        onHide={() => setShowFilters(false)}
        onApply={(personnage, livre, auteur) => fetchQuotes(personnage, livre, auteur)}
      />
      <Container className="mt-4">
        {error && <p className="text-danger text-center">{error}</p>}
        {loading && <p className="text-center" style={{ color: 'var(--gold)' }}>Chargement...</p>}
        <Row className="g-4">
          {currentQuotes.map((q, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
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
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Précédent
            </button>
            <span style={{ color: 'var(--gold)' }}>Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Suivant
            </button>
          </div>
        )}
      </Container>
    </>
  )
}

export default App