export interface HypothesesType {
  hypotheses: { hypothesis: string; questions: string[] }[];
}

export interface HypothesesReviewType {
  overallRating: number;
  score: { hypothesis: string; questions: number[] }[];
  userId: string;
}
