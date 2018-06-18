import { combineReducers } from "redux";
import { ISurveyFormFromDatabase } from "../../types/customTypes";
import {
  ADD_QUESTION,
  CLEAR_SURVEY,
  GET_DATA_FROM_DB_BY_ID,
  GET_RECENT_FORMS_FROM_DB,
  REMOVE_QUESTION,
  SAVE_FORM_TO_DB,
  SAVE_SURVEY_TO_DB,
  SET_SEARCH_TERM,
  UPDATE_QUESTION,
  UPDATE_SECTION_BREAK,
  UPDATE_SURVEY_INFO,
  UPDATE_STATE_STATUS,
} from "./actions";

// REDUCER FUNCTIONS
function addQuestionReducer(state: any, action: any) {
  return [...state, action.template];
  // const newState = [...state];
  // newState.splice(action.currentIndex + 1, 0, action.template);
  // return newState;
}
function removeQuestionReducer(state: any, action: any) {
  return state.filter((e: any) => e.questionId !== action.questionId);
}
function updateQuestionReducer(state: any, action: any) {
  return state.map(
    (e: any) =>
      e.questionId === action.questionId
        ? { ...e, [action.questionKey]: action.value }
        : e,
  );
}
function replaceQuestionReducer(state, action) {
  return state.map(
    e => (e.questionId === action.questionId ? action.template : e),
  );
}

function toggleAnswerCheckerReducer(state: any, action: any) {
  return state.map(
    (q: any) =>
      q.questionId === action.questionId
        ? {
            ...q,
            answers: q.answers.map(
              (a: any, i: any) =>
                i === action.answerId
                  ? { ...a, [action.answerKey]: !a[action.answerKey] }
                  : a,
            ),
          }
        : q,
  );
}
function addSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: [
      ...state.sectionBreaks,
      {
        questionId: action.questionId,
        title: action.title,
        description: action.description,
        bigBreak: action.bigBreak,
      },
    ],
  };
}
function updateSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: [
      ...state.sectionBreaks,
      {
        questionId: action.questionId,
        title: action.title,
        description: action.description,
        bigBreak: action.bigBreak,
      },
    ],
  };
}
function removeSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: state.sectionBreaks.filter(
      (e: any) => e.questionId !== action.questionId,
    ),
  };
}

function addAnswer(state: any, action: any) {}
function removeAnswer(state: any, action: any) {}
function updateAnswer(state: any, action: any) {}

// DEFAUL_STATE
const DEFAULT_STATE = {
  searchTerm: "",
  recentForms: [
    {
      formId: "123as",
      thumbnail: "asdf33aefasf",
      title: "string",
      completed: false,
    },
  ],
  surveyInfo: {
    title: "",
    description: "",
    isDeleted: false,
    completed: false,
    author: { username: "daniel" },
    sectionBreaks: [
      { questionId: 112314, title: "", description: "", bigBreak: false },
    ],
    formId: "",
  },
  surveyContents: [
    {
      questionId: Date.now().toString(36),
      questionType: "longQuestion",
      question: "",
      description: "",
      answers: [""],
    },
  ],
  clientSurveyData: {
    completed: false,
    formId: "String",
    clientSurveyId: "String",
    author: { username: "daniel" },
    clientInfo: {
      firstName: "String",
      lastName: "String",
      email: "String",
      phone: "123456",
      address: "String",
      gender: "String",
    },
    contents: [
      {
        questionId: 135145,
        position: 1,
        questionType: "longQuestion",
        question: "defaukt stqetasrfasdf",
        description: "",
        answers: [""],
      },
    ],
  },
  stateStatus: {
    currentPosition: 1,
    currentIndex: 1,
    selectedQuestionType: "multipleChoices",
    statusText: "",
    tempId: "",
  },
};

// REDUCERS
const searchTerm = (state = "", action: any) =>
  action.type === SET_SEARCH_TERM ? action.searchTerm : state;

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) => {
  switch (action.type) {
    case GET_RECENT_FORMS_FROM_DB:
      return [...action.recentForms] || state;
    default:
      return state;
  }
};

const surveyInfo = (state = DEFAULT_STATE.surveyInfo, action: any) => {
  switch (action.type) {
    case GET_DATA_FROM_DB_BY_ID:
      return { ...state, ...action.surveyInfo };
    case SAVE_FORM_TO_DB:
      return { ...state };
    case UPDATE_SURVEY_INFO:
      return {
        ...state,
        [action.infoKey]: action.value,
      };
    case "ADD_SECTION_BREAK":
      return addSectionBreakReducer(state, action);
    case "REMOVE_SECTION_BREAK":
      return removeSectionBreakReducer(state, action);
    case UPDATE_SECTION_BREAK:
      return updateSectionBreakReducer(state, action);
    case CLEAR_SURVEY:
      return {};
    default:
      return { ...state };
  }
};

const clientSurveyData = (
  state = { author: {}, clientInfo: {}, contents: [] },
  action: any,
) => {
  switch (action.type) {
    case GET_DATA_FROM_DB_BY_ID:
      return {
        ...state,
        contents: action.surveyContents,
        formId: action.surveyId,
      };
    case SAVE_SURVEY_TO_DB:
      return state;
    case "UPDATE_CLIENT_INFO":
      return {
        ...state,
        clientInfo: { ...state.clientInfo, [action.infoKey]: action.value },
      };
    default:
      return state;
  }
};

const surveyContents = (state = [], action: any) => {
  switch (action.type) {
    case GET_DATA_FROM_DB_BY_ID:
      return [...action.surveyContents];
    case ADD_QUESTION:
      return addQuestionReducer(state, action);
    case REMOVE_QUESTION:
      return removeQuestionReducer(state, action);
    case UPDATE_QUESTION:
      return updateQuestionReducer(state, action);
    case "REPLACE_QUESTION":
      return replaceQuestionReducer(state, action);
    case "TOGGLE_ANSWER_CHECKER":
      return toggleAnswerCheckerReducer(state, action);
    case CLEAR_SURVEY:
      return [];
    case SAVE_FORM_TO_DB:
      return [...state];
    default:
      return state;
  }
};

const stateStatus = (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_STATE_STATUS:
      console.log(action.value);
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  brandName: () => "Survey Test Sites",
  searchTerm,
  recentForms,
  surveyInfo,
  clientSurveyData,
  surveyContents,
  stateStatus,
});

export default rootReducer;
