type RatingValue = 'BUY' | 'HOLD' | 'SELL'

interface RatingEntry {
  rating: RatingValue
  score: number
}

export interface RatingsSummary {
  SA_Analysts: RatingEntry
  Wall_Street: RatingEntry
  Quant: RatingEntry
}
