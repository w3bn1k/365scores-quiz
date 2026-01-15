export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
  correctOptionId: string;
};

export type QuizStatus = 'idle' | 'in_progress' | 'answered' | 'finished';


