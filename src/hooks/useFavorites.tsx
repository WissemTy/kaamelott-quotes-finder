import { useState, useEffect } from 'react'
import type { Citation } from '../types'

function useFavorites() {
    const [favorites, setFavorites] = useState<Citation[]>(() => {
        const stored = localStorage.getItem('kaamelott-favorites')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('kaamelott-favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (citation: Citation) => {
        setFavorites(prev => {
            if (prev.some(f => f.citation === citation.citation)) return prev
            return [...prev, citation]
        })
    }

    const removeFavorite = (citation: Citation) => {
        setFavorites(prev => prev.filter(f => f.citation !== citation.citation))
    }

    const isFavorite = (citation: Citation) => {
        return favorites.some(f => f.citation === citation.citation)
    }

    const clearFavorites = () => setFavorites([])
    
    return { favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }
}

export default useFavorites