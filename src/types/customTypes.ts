export interface ILongQuestion {
  [key: string]: any;
  questionType: "longQuestion";
  question: string;
  description: string;
  answers: string[];
}
export interface IShortQuestion {
  [key: string]: any;
  questionType: "shortQuestion";
  question: string;
  description: string;
  answers: string[];
}
export interface IMultipleChoices {
  [key: string]: any;
  questionType: "multipleChoices";
  question: string;
  description: string;
  answers: { chosen: boolean, correct: boolean; answer: string }[];
}
export interface IDropdown {
  [key: string]: any;
  questionType: "dropdown";
  question: string;
  description: string;
  answers: { chosen: boolean, correct: boolean; answer: string }[];
}
export interface IMultipleDropdown {
  [key: string]: any;
  questionType: "multipleDropdown";
  question: string;
  description: string;
  headers: { headerId: number; text: string; tooltip: string; answerOptions: string[] }[];
  answers: { answerId: number; contents: { refId: number; textAnswer: string, chosen: boolean }[] }[];
}
export interface ICheckBox {
  [key: string]: any;
  questionType: "checkbox";
  question: string;
  description: string;
  answers: {
    correct: boolean,
    text: string,
    chosen: boolean
  }[];
}
export interface IPriorityQuestion {
  [key: string]: any;
  questionType: "priorityQuestion";
  question: string;
  description: string;
  answers: { priority: number; answer: string }[];
  additionalContents: {
    description: string;
    contents: { question: string; answers: string }[];
  }[];
}

export interface ISurveyFormFromDatabase {
  [key: string]: any;
  title: string;
  description: string;
  contents: (ILongQuestion | IShortQuestion | IMultipleChoices | IMultipleDropdown | ICheckBox | IDropdown | IPriorityQuestion)[];
  author: { username: string };
  isDeleted: boolean;
  completed: boolean;
  sectionBreaks: number[];
  formId: string;
}

export interface ISurveyData {
  info: any;
  content: any[];
  msgError: string;
  msgSuccess: string;
  responses: any[];
}

export interface ISurveySubmit {
  loading: boolean;
  survey: any;
  error: boolean;
  errorMsg: string;
}

export interface IStatus {
  submitResponse: string;
}

export interface ISurveyResponse {
  question: any[];
}

export interface IRecentForms {
  forms: any[];
}
