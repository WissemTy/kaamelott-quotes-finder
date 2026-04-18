import { useEffect, useState } from 'react'
import { type Citation, type ApiResponse } from './types'

function App() {
  const [quote, setQuote] = useState<Citation | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/random')
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if (data.status === 1 && data.citation && !Array.isArray(data.citation)) {
          setQuote(data.citation)
        } else {
          setError('Erreur lors de la récupération de la citation')
        }
      })
      .catch(() => setError('Impossible de contacter l\'API'))
  }, [])

  return (
    <div>
      <h1>Kaamelott Quotes</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {quote ? (
        <div>
          <p>"{quote.citation}"</p>
          <p>{quote.infos.personnage} — {quote.infos.saison}, {quote.infos.episode}</p>
        </div>
      ) : (
        !error && <p>Chargement...</p>
      )}
    </div>
  )
}

export default App