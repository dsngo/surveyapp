import { combineReducers } from "redux";
import {
  CLEAR_SUBMIT_STATUS,
  CLEAR_SURVEY,
  SET_SEARCH_TERM,
  UPDATE_SURVEY_INFO,
  ADD_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  UPDATE_QUESTION_TYPE,
  UPDATE_TEMP_SURVEY_ID,
  GET_DATA_FROM_DB_BY_ID,
  UPDATE_SELECTED_QUESTION_TYPE,
  UPDATE_CURRENT_INDEX,
  UPDATE_SECTION_BREAK,
  GET_RECENT_FORMS_FROM_DB,
  UPDATE_SUBMIT_STATUS,
  SAVE_FORM_TO_DB,
  SAVE_SURVEY_TO_DB,
  GET_CLIENT_SURVEY_FROM_DB,
} from "./actions";
import { ISurveyFormFromDatabase } from "../../types/customTypes";

const DEFAULT_STATE = {
  searchTerm: "",
  recentForms: [{ formId: "123as", thumbnail: "asdf33aefasf", title: "string", completed: false }],
  surveyInfo: {
    title: "",
    description: "",
    isDeleted: false,
    completed: false,
    author: { username: "daniel" },
    sectionBreaks: [{ questionId: 112314, title: "", description: "", bigBreak: false }],
    formId: "",
  },
  surveyContents: [
    {
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
    currentId: 1,
    selectedQuestionType: "shortQuestion",
    submitStatus: "",
    tempId: "",
  },
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) =>
  (action.type === GET_RECENT_FORMS_FROM_DB && [...action.recentForms]) || [...state];

const surveyInfo = (state: any = {}, action: any) =>
  // API
  (action.type === GET_DATA_FROM_DB_BY_ID && { ...action.surveyInfo }) ||
  (action.type === SAVE_FORM_TO_DB && { ...state }) ||
  // MODIFICATION
  (action.type === UPDATE_SURVEY_INFO && { ...state, [action.infoKey]: action.value }) ||
  // SECTION BREAK
  (action.type === "ADD_SECTION_BREAK" && addSectionBreakReducer(state, action)) ||
  (action.type === "REMOVE_SECTION_BREAK" && removeSectionBreakReducer(state, action)) ||
  (action.type === UPDATE_SECTION_BREAK && updateSectionBreakReducer(state, action)) ||
  (action.type === CLEAR_SURVEY && DEFAULT_STATE.surveyInfo);

const clientSurveyData = (state = { author: {}, clientInfo: {}, contents: [] }, action: any) =>
  // API
  (action.type === GET_DATA_FROM_DB_BY_ID && { ...state, contents: action.surveyContents, formId: action.surveyId }) ||
  (action.type === SAVE_SURVEY_TO_DB && { ...state }) ||
  // MODIFICATION
  (action.type === "UPDATE_CLIENT_INFO" && { ...state, clientInfo: { ...state.clientInfo, [action.infoKey]: action.value } });

const surveyContents = (state = [], action: any) =>
  // API
  (action.type === GET_DATA_FROM_DB_BY_ID && [...action.surveyContents]) ||
  // MODIFICATION
  (action.type === ADD_QUESTION && toggleAnswerCheckerReducer(state, action)) ||
  (action.type === REMOVE_QUESTION && toggleAnswerCheckerReducer(state, action)) ||
  (action.type === UPDATE_QUESTION && toggleAnswerCheckerReducer(state, action)) ||
  (action.type === "TOGGLE_ANSWER_CHECKER" && toggleAnswerCheckerReducer(state, action)) ||
  (action.type === CLEAR_SURVEY && []) ||
  (action.type === SAVE_FORM_TO_DB && []);

const stateStatus = (state = {}, action: any) =>
  action.type === "UPDATE_STATE_STATUS" && { ...state, [action.statusKey]: action.value };

export const rootReducer = combineReducers({
  searchTerm,
  recentForms,
  surveyInfo,
  clientSurveyData,
  surveyContents,
  stateStatus,
});

// REDUCER FUNCTIONS

function addQuestionReducer(state: any, action: any) {
  const newState
  return [...state, {}]
  return state.map((q: any)=> q.questionId === action.questionId ? {}:)
}

function toggleAnswerCheckerReducer(state: any, action: any) {
  return state.map(
    (q: any) =>
      q.questionId === action.questionId
        ? {
            ...q,
            answers: q.answers.map(
              (a: any, i: any) => (i === action.answerId ? { ...a, [action.answerKey]: !a[action.answerKey] } : a),
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
      { questionId: action.questionId, title: action.title, description: action.description, bigBreak: action.bigBreak },
    ],
  };
}
function updateSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: [
      ...state.sectionBreaks,
      { questionId: action.questionId, title: action.title, description: action.description, bigBreak: action.bigBreak },
    ],
  };
}
function removeSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: state.sectionBreaks.filter((e: any) => e.questionId !== action.questionId),
  };
}
