export interface CitationInfos {
  auteur: string
  acteur: string
  personnage: string
  saison: string
  episode: string
}

export interface Citation {
  citation: string
  infos: CitationInfos
}

export interface ApiResponse {
  status: 1 | 0
  citation?: Citation | Citation[]
  code?: number
  error?: string
}