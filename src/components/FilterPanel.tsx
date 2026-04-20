import { useState } from 'react'
import { Offcanvas, Form, Button, Stack } from 'react-bootstrap'
import { PERSONNAGES, AUTEURS, LIVRES } from '../types/constants-data'


const filtreBoutonStyle = {
  backgroundColor: 'var(--filter-bg)',
  color: 'var(--text)',
  borderColor: 'var(--border-off)',
};

interface FilterPanelProps {
  show: boolean
  onHide: () => void
  onApply: (personnage: string, livre: string, auteur: string) => void
}

function FilterPanel({ show, onHide, onApply }: FilterPanelProps) {
  const [personnage, setPersonnage] = useState('')
  const [livre, setLivre] = useState('')
  const [auteur, setAuteur] = useState('')

  const handleApply = () => {
    onApply(personnage, livre, auteur)
    onHide()
  }

  const handleReset = () => {
    setPersonnage('')
    setLivre('')
    setAuteur('')
    onApply('', '', '')
    onHide()
  }

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" style={{ backgroundColor: 'var(--filter-panel-bg)' }}>
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title style={{ color: 'var(--gold)'}}> Filtres </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={4}>

          <Form.Group>
            <Form.Label style={{ color: 'var(--gold)' }}>Personnage</Form.Label>
            <Form.Select
              value={personnage}
              onChange={e => setPersonnage(e.target.value)}
              style={filtreBoutonStyle}>
              <option value="">Tous les personnages</option>
              {PERSONNAGES.map(p => (<option key={p} value={p}>{p}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ color: 'var(--gold)' }}>Livre</Form.Label>
            <Form.Select
              value={livre}
              onChange={e => setLivre(e.target.value)}
              style={filtreBoutonStyle}>
              <option value="">Tous les livres</option>
              {LIVRES.map(l => (<option key={l} value={l}>Livre {l}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ color: 'var(--gold)' }}>Auteur</Form.Label>
            <Form.Select
              value={auteur}
              onChange={e => setAuteur(e.target.value)}
              style={filtreBoutonStyle}>
              <option value="">Tous les auteurs</option>
              {AUTEURS.map(a => (<option key={a} value={a}>{a}</option>))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              className="w-100"
              onClick={handleReset}
              style={{ backgroundColor: 'transparent', borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              Réinitialiser
            </Button>
            <Button
              className="w-100"
              onClick={handleApply}
              style={{ backgroundColor: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--black-text)' }}>
              Appliquer
            </Button>
          </div>

        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default FilterPanel