# Kaamelott Quotes Finder

Interface web permettant de consulter et filtrer les citations de la série *Kaamelott* via l'API REST [api-kaamelott](https://github.com/sin0light/api-kaamelott).

## Stack

- **ReactJS** + **TypeScript** — initialisé avec Vite
- **React-Bootstrap** — composants UI et grille responsive
- **Docker** + **Nginx** — conteneurisation multi-stage
- **Netlify** — déploiement en production

## Fonctionnalités

- Affichage de toutes les citations avec pagination (18 par page)
- Citation aléatoire affichée directement en modal
- Filtres par personnage, livre et auteur
- Recherche textuelle dans la liste des personnages
- Modal détaillé avec portrait du personnage
- Système de favoris via localStorage
- Modal d'informations avec statistiques de l'API

## Lancer le projet

```bash
npm install
npm run dev
```

## Docker

```bash
docker build -t kaamelott-quotes-finder .
docker run -p 8080:80 kaamelott-quotes-finder
```

## Démo

[kaamelott-quotes-finder.netlify.app](https://kaamelott-quotes-finder.netlify.app/)