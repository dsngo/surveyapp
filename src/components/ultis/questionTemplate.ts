const multipleDropdown = {
  questionId: Date.now().toString(36),
  questionType: "multipleDropdown",
  question: "",
  description: "",
  headers: [],
  answers: [],
};

const priorityQuestion = {
  questionId: Date.now().toString(36),
  questionType: "priorityQuestion",
  question: "",
  description: "",
  answers: [
    {
      id: (Date.now() + 1).toString(36),
      priority: 0,
      answer: "",
    },
  ],
  additionalContents: [],
};

export function createTemplate(
  questionType = "checkbox",
  questionId = Date.now().toString(36),
) {
  const base = {
    questionId,
    questionType,
    question: "",
    description: "",
    answers: "",
  };
  const options = [
    {
      id: (Date.now() + 1).toString(36),
      correct: false,
      text: "",
    },
  ];
  const priorityOptions = [
    {
      id: (Date.now() + 1).toString(36),
      key: "A",
      text: "",
    },
  ];
  switch (questionType) {
    case "text":
      return { ...base };
    case "checkbox":
      return { ...base, answers: [], options, maxChoice: options.length };
    case "priority":
      return { ...base, answers: {}, options: priorityOptions };
    default:
      return { ...base, options };
  }
}
