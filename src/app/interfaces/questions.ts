export interface Questions {
  question: string;
  answers: Answer[];
  round: number;
  type: string;
}

export interface Answer {
  text: string;
  right: boolean;
}
