export const longQuestion = {
    questionType: "longQuestion",
    question: "",
    description: "",
    answers: [""]
}

export const shortQuestion = {
    questionType: "shortQuestion",
    question: "",
    description: "",
    answers: [""]
}

export const multipleChoices = {
    questionType: "multipleChoices",
    question: "",
    description: "",
    answers: [{
        correct: false,
        answer: ""
    }]
}

export const dropdown = {
    questionType: "dropdown",
    question: "",
    description: "",
    answers: [{
        correct: false,
        answer: ""
    }]
}

export const multipleDropdown = {
    questionType: "multipleDropdown",
    question: "",
    description: "",
    headers : [],
    answers: []
}

export const checkbox = {
    questionType: "checkbox",
    question: "",
    description: "",
    answers: [{
        correct: false,
        text: ""
    }]
}

export const priorityQuestion = {
    questionType: "priorityQuestion",
    question: "",
    description: "",
    answers: [{
        priority: 0,
        answer: ""
    }],
    additionalContents: []
}