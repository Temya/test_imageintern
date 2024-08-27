export interface Questions {
  question: string;
  answers: Answer[];
  type: string;
  images?: ImageData[];
}

export interface Answer {
  text: string;
  right: boolean;
}

export interface Round {
  round: number;
  questions: Questions[];
}

export interface ImageData {
  url: string;
  text: string;
}

export interface Achievements {
  achievement: string;
  availability: boolean;
}
