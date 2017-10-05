export interface ILongQuestion {
    [key: string]: any;
    questionType: "longQuestion";
    question: string;
    answers: string[];
}
export interface IShortQuestion {
    [key: string]: any;
    questionType: "shortQuestion";
    question: string;
    answers: string[];
}
export interface IMultipleChoices {
    [key: string]: any;
    questionType: "multipleChoices";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
export interface IDropdown {
    [key: string]: any;
    questionType: "dropdown";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
export interface IMultipleDropdown {
    [key: string]: any;
    questionType: "multipleDropdown";
    questions: { id: number; question: string }[];
    answers: { answerId: number; contents: { id: number; answers: string[] }[] }[];
}
export interface ICheckBox {
    [key: string]: any;
    questionType: "checkbox";
    question: string;
    answers: string[];
}
export interface IPriorityQuestion {
    [key: string]: any;
    questionType: "priorityQuestion";
    question: string;
    answers: { priority: number; answer: string }[];
    additionalContents: { description: string; contents: { question: string; answers: string }[] }[];
}

export interface ISurveyFormFromDatabase {
    [key: string]: any;
    title: string;
    description: string;
    contents: (
        | ILongQuestion
        | IShortQuestion
        | IMultipleChoices
        | IMultipleDropdown
        | ICheckBox
        | IDropdown
        | IPriorityQuestion)[];
    author: { username: string };
    isDeleted: boolean;
    completed: boolean;
}
