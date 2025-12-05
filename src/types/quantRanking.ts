interface RankingDetail {
  rank: number
  total: number
}

interface Rankings {
  overall: RankingDetail
  sector: RankingDetail
  industry_specific: RankingDetail
}

export interface RankingDetails {
  sector: string
  industry: string
  rankings: Rankings
}
