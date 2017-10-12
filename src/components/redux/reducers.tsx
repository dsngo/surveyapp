import { SET_SEARCH_TERM, ADD_NEW_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION } from "./actions";
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
  clientSurveyData: {},
  stateStatus: {
    currentIndex: 1,
    selectedQuestionType: "",
    submitStatus: "",
  },
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) =>
  (action.type === "GET_RECENT_FORMS_FROM_DB" && [...action.recentForms]) || [...state];

const surveyInfo = (state = {}, action: any) =>
  (action.type === "GET_DATA_FROM_DB" && { ...action.surveyInfo }) ||
  (action.type === "SAVE_FORM_TO_DB" && { ...state }) ||
  (action.type === "UPDATE_SECTION_BREAK" && { ...state, sectionBreaks: action.sectionBreaks }) || { ...state };

const clientSurveyData = (state = {}, action: any) =>
  (action.type === "GET_CLIENT_SURVEY_FROM_DB" && { ...action.clientSurveyData }) ||
  (action.type === "SAVE_SURVEY_TO_DB" && { ...state }) || { ...state };

const surveyContents = (state = DEFAULT_STATE.surveyContents, action: any) =>
  (action.type === ADD_NEW_QUESTION && (state.splice(action.questionIndex, 0, action.questionData), [...state])) ||
  (action.type === REMOVE_QUESTION && (state.splice(action.questionIndex, 1), [...state])) ||
  (action.type === UPDATE_QUESTION && (state.splice(action.questionIndex, 1, action.questionData), [...state])) ||
  (action.type === "GET_DATA_FROM_DB" && [...action.surveyContents]) ||
  (action.type === "SAVE_FORM_TO_DB" && []) || [...state];

const stateStatus = (state = {}, action: any) =>
  (action.type === "UPDATE_CURRENT_INDEX" && { ...state, currentIndex: action.currentIndex }) ||
  (action.type === "UPDATE_SUBMIT_STATUS" && { ...state, submitStatus: action.submitStatus }) ||
  (action.type === "UPDATE_SELECTED_QUESTION_TYPE" && { ...state, selectedQuestionType: action.questionType }) || { ...state };

export const rootReducer = combineReducers({
  searchTerm,
  recentForms,
  surveyInfo,
  clientSurveyData,
  surveyContents,
  stateStatus,
});
