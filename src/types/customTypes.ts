interface ILongQuestion {
    questionType: "longQuestion";
    question: string;
    answers: string[];
}
interface IShortQuestion {
    questionType: "shortQuestion";
    question: string;
    answers: string[];
}
interface IMultipleChoices {
    questionType: "multipleChoices";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
interface IDropdown {
    questionType: "dropdown";
    question: string;
    answers: { correct: boolean; answer: string }[];
}
interface IMultipleDropdown {
    questionType: "multipleDropdown";
    questions: { id: number; question: string }[];
    answers: { answerId: number; contents: { id: number; answer: string[] }[] }[];
}
interface ICheckBox {
    questionType: "checkbox";
    question: string;
    answers: string[];
}
interface IPriorityQuestion {
    questionType: "priorityQuestion";
    question: string;
    answers: { priority: number; answer: string }[];
    additionalContents: { description: string; contents: { question: string; answer: string }[] };
}
