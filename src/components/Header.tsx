import { Navbar, Container, Button } from 'react-bootstrap'

interface HeaderProps {
  onRandomQuote: () => void
  onShowFilters: () => void
  onReset: () => void
  onShowFavorites: () => void
  showFavorites: boolean
  favoritesCount: number
  onShowInfo: () => void
}

function Header({ onRandomQuote, onShowFilters, onReset, onShowFavorites, showFavorites, favoritesCount, onShowInfo }: HeaderProps) {
  return (
    <Navbar variant="dark" className="py-3 w-100" style={{ backgroundColor: 'var(--bg-navbar)' }}>
      <Container fluid>
        <Navbar.Brand onClick={onReset} style={{ fontFamily: 'Folkard, fantasy', fontSize: '1.8rem', color: 'var(--gold)', cursor: 'pointer' }}>
          Kaamelott Quotes
        </Navbar.Brand>
        <div className="d-flex gap-2 ms-auto">

          <Button
            className="btn-header"
            onClick={onShowInfo}
            style={{ backgroundColor: 'transparent', borderColor: 'var(--gold)', color: 'var(--gold)' }}
          >
            Info
          </Button>

          <Button
            className="btn-header"
            onClick={onShowFavorites}
            style={{
              backgroundColor: showFavorites ? 'var(--gold)' : 'transparent',
              borderColor: 'var(--gold)',
              color: showFavorites ? 'var(--black-text)' : 'var(--gold)'
            }}
          >
            ★ Favoris {favoritesCount > 0 && `(${favoritesCount})`}
          </Button>

          <Button
            className="btn-header"
            onClick={onShowFilters}
            style={{ backgroundColor: 'transparent', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            Filtres
          </Button>

          <Button
            className="btn-header"
            onClick={onRandomQuote}
            style={{ backgroundColor: 'var(--gold)', borderColor: 'var(--gold)', color: '#000000' }}>
            Citation au hasard
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header