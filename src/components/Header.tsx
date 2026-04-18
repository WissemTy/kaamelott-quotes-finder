import { Navbar, Container, Button } from 'react-bootstrap'

interface HeaderProps {
  onRandomQuote: () => void
}

function Header({ onRandomQuote }: HeaderProps) {
  return (
    <Navbar style={{ backgroundColor: 'var(--bg-navbar)' }} variant="dark" className="py-3 w-100">
      <Container fluid>
        <Navbar.Brand style={{ fontFamily: 'Folkard, fantasy', fontSize: '1.8rem', color: 'var(--gold)' }}>
          Kaamelott Quotes
        </Navbar.Brand>
        <Button className="ms-auto" onClick={onRandomQuote} style={{ backgroundColor: 'var(--gold)', borderColor: 'var(--gold)', color: '#000000' }}>
          Citation au hasard
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header