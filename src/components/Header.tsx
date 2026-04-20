import { Navbar, Container, Button } from 'react-bootstrap'

interface HeaderProps {
  onRandomQuote: () => void
  onShowFilters: () => void
}

function Header({ onRandomQuote, onShowFilters }: HeaderProps) {
  return (
    <Navbar variant="dark" className="py-3 w-100" style={{ backgroundColor: 'var(--bg-navbar)' }}>
      <Container fluid>
        <Navbar.Brand style={{ fontFamily: 'Folkard, fantasy', fontSize: '1.8rem', color: 'var(--gold)' }}>
          Kaamelott Quotes
        </Navbar.Brand>
        <div className="d-flex gap-2 ms-auto">
          <Button
            onClick={onShowFilters}
            style={{ backgroundColor: 'transparent', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
            Filtres
          </Button>
          <Button
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