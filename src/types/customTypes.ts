export interface ILongQuestion {
    questionType: "longQuestion";
    question: string;
    answers: string[];
}
export interface IShortQuestion {
    questionType: "shortQuestion";
    question: string;
    answers: string[];
}
export interface IMultipleChoices {
    questionType: "multipleChoices";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
export interface IDropdown {
    questionType: "dropdown";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
export interface IMultipleDropdown {
    questionType: "multipleDropdown";
    questions: { id: number; question: string }[];
    answers: { answerId: number; contents: { id: number; answer: string[] }[] }[];
}
export interface ICheckBox {
    questionType: "checkbox";
    question: string;
    answers: string[];
}
export interface IPriorityQuestion {
    questionType: "priorityQuestion";
    question: string;
    answers: { priority: number; answer: string }[];
    additionalContents: { description: string; contents: { question: string; answer: string }[] };
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