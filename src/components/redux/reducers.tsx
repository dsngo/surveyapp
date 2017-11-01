import {
  CLEAR_SUBMIT_STATUS,
  CLEAR_SURVEY,
  SET_SEARCH_TERM,
  UPDATE_INFO_SURVEY,
  ADD_NEW_QUESTION,
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
import * as Templates from "../../types/questionTemplate";
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
    sectionBreaks: [{ index: 1, title: "", description: "", bigBreak: false }],
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
    tempId: "",
  },
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) =>
  (action.type === GET_RECENT_FORMS_FROM_DB && [...action.recentForms]) || [...state];

const surveyInfo = (state = {}, action: any) =>
  (action.type === CLEAR_SURVEY && DEFAULT_STATE.surveyInfo) ||
  (action.type === UPDATE_INFO_SURVEY && { ...state, title: action.info.title, description: action.info.description }) ||
  (action.type === GET_DATA_FROM_DB_BY_ID && { ...action.surveyInfo }) ||
  (action.type === SAVE_FORM_TO_DB && { ...state }) ||
  (action.type === UPDATE_SECTION_BREAK && { ...state, sectionBreaks: action.sectionBreaks }) || { ...state };

const clientSurveyData = (state = { author: {}, clientInfo: {}, contents: [] }, action: any) =>
  (action.type === GET_DATA_FROM_DB_BY_ID && { ...state, contents: action.surveyContents, formId: action.surveyId }) ||
  (action.type === SAVE_SURVEY_TO_DB && { ...state }) ||
  (action.type === "UPDATE_FIRSTNAME" && { ...state, clientInfo: { ...state.clientInfo, firstName: action.firstName } }) ||
  (action.type === "UPDATE_LASTNAME" && { ...state, clientInfo: { ...state.clientInfo, lastName: action.lastName } }) ||
  (action.type === "UPDATE_EMAIL" && { ...state, clientInfo: { ...state.clientInfo, email: action.email } }) ||
  (action.type === "UPDATE_PHONE" && { ...state, clientInfo: { ...state.clientInfo, phone: action.phone } }) ||
  (action.type === "UPDATE_ADDRESS" && { ...state, clientInfo: { ...state.clientInfo, address: action.address } }) ||
  (action.type === "UPDATE_GENDER" && { ...state, clientInfo: { ...state.clientInfo, gender: action.gender } }) || { ...state };

const surveyContents = (state = [{}], action: any) =>
  (action.type === CLEAR_SURVEY && (state.splice(0, state.length), [...state])) ||
  (action.type === ADD_NEW_QUESTION && (state.splice(action.currentIndex || state.length, 0, action.template), [...state]))  ||
  (action.type === REMOVE_QUESTION && (state.splice(action.questionIndex, 1), [...state])) ||
  (action.type === UPDATE_QUESTION && (state.splice(action.questionIndex, 1, action.questionData), [...state])) ||
  (action.type === GET_DATA_FROM_DB_BY_ID && [...action.surveyContents]) ||
  (action.type === SAVE_FORM_TO_DB && []) ||
  (state || []);

const stateStatus = (state = { seletedQuestionType: "" }, action: any) =>
  (action.type === UPDATE_CURRENT_INDEX && { ...state, currentIndex: action.currentIndex }) ||
  (action.type === UPDATE_SUBMIT_STATUS && { ...state, submitStatus: action.submitStatus }) ||
  (action.type === UPDATE_TEMP_SURVEY_ID && { ...state, tempId: action.id }) ||
  (action.type === CLEAR_SURVEY && { ...state, tempId: "" }) ||
  (action.type === CLEAR_SUBMIT_STATUS && { ...state, submitStatus: "" }) ||
  (action.type === UPDATE_SELECTED_QUESTION_TYPE && { ...state, selectedQuestionType: action.questionType }) || { ...state };

export const rootReducer = combineReducers({
  searchTerm,
  recentForms,
  surveyInfo,
  clientSurveyData,
  surveyContents,
  stateStatus,
});
