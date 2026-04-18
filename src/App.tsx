import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import type { Citation, ApiResponse } from './types'
import Header from './components/Header'
import QuoteCard from './components/QuoteCard'

function App() {
  const [quote, setQuote] = useState<Citation | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchRandomQuote = () => {
    setQuote(null)
    setError(null)
    fetch('/api/random')
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setQuote(data.citation)
        } else {
          setError('Erreur lors de la récupération de la citation')
        }
      })
      .catch(() => setError("Impossible de contacter l'API"))
  }

  useEffect(() => {
    fetchRandomQuote()
  }, [])

  return (
    <>
      <Header onRandomQuote={fetchRandomQuote} />
      <Container className="mt-4">
        {error && <p className="text-danger text-center">{error}</p>}
        {quote ? (
          <QuoteCard
            quote={quote.citation}
            character={quote.infos.personnage}
            episode={quote.infos.episode}
            season={quote.infos.saison}
          />
        ) : (
          !error && <p className="text-center text-light">Chargement...</p>
        )}
      </Container>
    </>
  )
}

export default App