export interface Questions {
  question: string;
  answers: Answer[];
  type: string;
  images?: imageData[]
}

export interface Answer {
  text: string;
  right: boolean;
}

export interface Round {
  round: number,
  questions: Questions[];
}

export interface imageData {
  url: string,
  text: string,
}
