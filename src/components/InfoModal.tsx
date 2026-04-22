import { Modal, Button } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa'
import { PERSONNAGES, AUTEURS, LIVRES } from '../types/constants-data'

interface InfoModalProps {
    show: boolean
    onHide: () => void
    totalQuotes: number
    favoritesCount: number
    onClearFavorites: () => void
}

function InfoModal({ show, onHide, totalQuotes, favoritesCount, onClearFavorites }: InfoModalProps) {

    const stats = [
        { label: 'Citations disponibles', value: totalQuotes, icon: '📜' },
        { label: 'Auteurs', value: AUTEURS.length, icon: '✍️' },
        { label: 'Personnages', value: PERSONNAGES.length, icon: '⚔️' },
        { label: 'Livres', value: LIVRES.length, icon: '📖' },
        { label: 'Favoris', value: favoritesCount, icon: '★' },
    ]

    return (
        <Modal show={show} onHide={onHide} centered size="lg" contentClassName="border-0 bg-transparent">
            <Modal.Body className="p-5 quote-modal-body">

                <h2 className="text-center mb-4 fantasy-font text-gold"> Kaamelott Quotes </h2>

                <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                    {stats.map(stat => (
                        <div key={stat.label} className="stat-card">
                            <div className="stat-icon color-gold">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="text-center my-3 text-gold">✦</div>

                <div className="text-center mb-4">
                    <Button
                        href="https://github.com/WissemTy" target="_blank"
                        className="d-inline-flex align-items-center gap-2 btn-github-custom">
                        <FaGithub size={20} />
                        <span>WissemTy</span>
                    </Button>
                </div>

                {favoritesCount > 0 && (
                    <div className="text-center mt-3">
                        <Button
                            className="btn-danger-custom"
                            onClick={() => { onClearFavorites(); onHide(); }}>
                            Vider les favoris
                        </Button>
                    </div>
                )}

            </Modal.Body>
        </Modal>
    )
}

export default InfoModal