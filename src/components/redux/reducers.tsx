import { SET_SEARCH_TERM, ADD_NEW_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION, UPDATE_INFO_SURVEY, 
  UPDATE_QUESTION_TYPE, UPDATE_TEMP_SURVEY_ID, GET_DATA_FROM_DB_BY_ID, CLEAR_SURVEY } from "./actions";
import {
  // ICheckBox,
  // IDropdown,
  // ILongQuestion,
  // IMultipleChoices,
  // IMultipleDropdown,
  // IPriorityQuestion,
  // IShortQuestion,
  ISurveyFormFromDatabase,
} from "../../types/customTypes";
import { combineReducers } from "redux";

const DEFAULT_STATE = {
  searchTerm: "",
  recentForms: [{ formId: "123as", thumbnail: "asdf33aefasf", title: "string", completed: false }],
  surveyInfo: {
    title: "",
    description: "",
    isDeleted: false,
    completed: false,
    author: { username: "daniel" },
    sectionBreaks: [{index: 1, title: "title section", description: "section desc", bigBreak: false}],
    formId: "askjfdq23",
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
    author: { username: "daniel"},
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
        questionType: "longQuestion",
        question: "defaukt stqetasrfasdf",
        description: "",
        answers: [""],
      },
    ],
  },
  stateStatus: {
    currentIndex: 1,
    selectedQuestionType: "shortQuestion",
    submitStatus: "",
    tempId: ""
  },
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) =>
  (action.type === "GET_RECENT_FORMS_FROM_DB" && [...action.recentForms]) || [...state];

const surveyInfo = (state = {}, action: any) =>
  (action.type === CLEAR_SURVEY && {})||
  (action.type === UPDATE_INFO_SURVEY && { ...state, title: action.info.title, description: action.info.description}) ||
  (action.type === GET_DATA_FROM_DB_BY_ID && { ...action.surveyInfo }) ||
  (action.type === "SAVE_FORM_TO_DB" && { ...state }) ||
  (action.type === "UPDATE_SECTION_BREAK" && { ...state, sectionBreaks: action.sectionBreaks }) || { ...state };

const clientSurveyData = (state = {}, action: any) =>
  (action.type === "GET_CLIENT_SURVEY_FROM_DB" && { ...action.clientSurveyData }) ||
  (action.type === "SAVE_SURVEY_TO_DB" && { ...state }) || { ...state };

const surveyContents = (state: any[], action: any) =>
  (action.type === CLEAR_SURVEY && [])||
  (action.type === ADD_NEW_QUESTION && (state.splice(action.questionIndex ? action.questionIndex : state.length , 0, { questionType: "shortQuestion", question: "", description: "", answers: []}), [...state])) ||
  (action.type === REMOVE_QUESTION && (state.splice(action.questionIndex, 1), [...state])) ||
  (action.type === UPDATE_QUESTION && (state.splice(action.questionIndex, 1, action.questionData), [...state])) ||
  (action.type === GET_DATA_FROM_DB_BY_ID && [...action.surveyContents]) ||
  (action.type === "SAVE_FORM_TO_DB" && []) || (state || []);

const stateStatus = (state = {}, action: any) =>
  (action.type === "UPDATE_CURRENT_INDEX" && { ...state, currentIndex: action.currentIndex }) ||
  (action.type === "UPDATE_SUBMIT_STATUS" && { ...state, submitStatus: action.submitStatus }) ||
  (action.type === UPDATE_TEMP_SURVEY_ID && { ...state, tempId: action.id }) ||
  (action.type === "CLEAR_SUBMIT_STATUS" && { ...state, submitStatus: ""}) ||
  (action.type === "UPDATE_SELECTED_QUESTION_TYPE" && { ...state, selectedQuestionType: action.questionType }) || { ...state };

export const rootReducer = combineReducers({
  searchTerm,
  recentForms,
  surveyInfo,
  clientSurveyData,
  surveyContents,
  stateStatus,
});
