export interface MCQQuestion {
  q: string;
  a: string[];
  c: number;
}

export interface TFQuestion {
  q: string;
  i: string[];
  a: boolean[];
}

export interface ShortQuestion {
  q: string;
  ref: string;
}

export interface QuizResult {
  total: number;
  mcqScore: number;
  tfScore: number;
  shortScore: number;
  feedback: string;
}
