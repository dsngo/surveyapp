import {
  ADD_API_DATA,
  ADD_AREA,
  ADD_MULTIPLE_CHOICE,
  CHANGE_QUESTION_DETAIL,
  CHANGE_TYPE_ANSWER,
  CHOOSE_AREA,
  CLEAR_MESSAGE,
  CLEAR_SUBMIT_STATUS,
  CLEAR_SURVEY,
  CREATE_SUCCESS,
  DELETE_AREA,
  DELETE_MULTIPLE_CHOICE,
  DIVIDE_SECTION,
  GET_RECENT_FORMS,
  GET_RESPONSES,
  GET_SURVEY,
  GET_SURVEY_ERROR,
  GET_SURVEY_SUCCESS,
  INIT_SURVEY_QUESTION,
  MISSING_INFO,
  SET_SEARCH_TERM,
  SUBMIT_SUCCESS,
  UPDATE_ANSWER_RESPONSE,
  UPDATE_DESCRIPTION_AREA,
  UPDATE_INFO_SURVEY,
  UPDATE_MULTIPLE_CHOICE,
  ADD_NEW_QUESTION,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
} from "./actions";
import {
  ICheckBox,
  IDropdown,
  ILongQuestion,
  IMultipleChoices,
  IMultipleDropdown,
  IPriorityQuestion,
  IShortQuestion,
  ISurveyData,
  ISurveyFormFromDatabase,
  ISurveyResponse,
  ISurveySubmit,
} from "../../types/customTypes";
import { combineReducers } from "redux";

const initialSurveyData = [
  {
    type: "description",
    title: "",
    description: "",
  },
];
interface IStatus {
  submitStatus: { error: boolean; message: string };
  creationFormStatus: { error: boolean; message: string };
  clientSurveyStatus: { error: boolean; message: string; isLoading: boolean };
}

interface IClientSurveyAnswers {
  answers: (ILongQuestion | IShortQuestion | IMultipleChoices | IMultipleDropdown | ICheckBox | IDropdown | IPriorityQuestion)[];
  completed: boolean;
}

const DEFAULT_STATE = {
  searchTerm: "",
  apiData: [{ formId: "123as", thumbnail: "asdf33aefasf", title: "string", completed: false }],
  surveyInfo: {
    title: "",
    description: "",
    isDeleted: false,
    completed: false,
    author: { username: "daniel" },
    formId: "askjfdq23",
  },
  surveyContents: [],
  clientSurveyData: {},
  stateStatus: {
    currentIndex: 1,
    selectedQuestionType: "",
    submitStatus: "",
  },
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const apiData = (state = {}, action: any) => (action.type === ADD_API_DATA ? { [action.apiData.id]: action.apiData } : state);

const recentForms = (state: ISurveyFormFromDatabase[] = [], action: any) => {
  let data = { ...state };
  switch (action.type) {
    case GET_RECENT_FORMS:
      data = action.forms;
      return data;
    default:
      return state;
  }
};

const surveyInfo = (state = {}, action: any) =>
  (action.type === "GET_DATA_FROM_DB" && { ...action.surveyInfo }) || 
  (action.type === "SAVE_SURVEY_TO_DB" && { ...state })
;

const clientSurveyData = (state = {}, action: any) =>
  (action.type === "GET_COMPLETED_SURVEY_BY_ID" && { ...action.clientSurveyData }) || 
  (action.type === "SAVE_SURVEY_TO_DB" && {})
;

const surveyContents = (
  state = [
    {
      questionType: "longQuestion",
      question: "",
      description: "",
      answers: [""],
    },
  ],
  action: any,
) =>
  (action.type === ADD_NEW_QUESTION && (state.splice(action.questionIndex, 0, action.questionData), [...state])) ||
  (action.type === REMOVE_QUESTION && (state.splice(action.questionIndex, 1), [...state])) ||
  (action.type === UPDATE_QUESTION && (state.splice(action.questionIndex, 1, action.questionData), [...state])) ||
  (action.type === "GET_DATA_FROM_DB" && [...action.surveyContents]) ||
  (action.type === "SAVE_FORM_TO_DB" && []) || [...state]
;

const sectionDivide = (state: boolean = false, action: any) => (action.type === DIVIDE_SECTION ? action.value : state);

const currentArea = (state: number = -1, action: any) => (action.type === CHOOSE_AREA ? action.index : state);

const stateStatus = (state: {}, action: any) =>
  (action.type === "UPDATE_CURRENT_STATUS" && { ...state, currentIndex: action.currentIndex }) ||
  (action.type === "SUBMIT_SUCCESS" && { ...state, submitStatus: "Success" }) ||
  (action.type === "SUBMIT_ERROR" && { ...state, submitStatus: "Error" }) ||
  (action.type === "UPDATE_SELECTED_QUESTION_TYPE" && { ...state, selectedQuestionType: action.questionType }) ||
  (action.type === "CLEAR_SUBMIT_STATUS" && { ...state, submitStatus: "" }) ||
  (action.type === "SAVE_SURVEY_TO_DB" && { ...state, submitStatus: action.statusMessage })
;

export const rootReducer = combineReducers({
  searchTerm,
  apiData,
  currentArea,
  clientSurveyData,
  stateStatus,
  recentForms,
  // surveyContents
});

function checkAnswerExist(answer: any, arrayAnswer: any) {
  for (let i = 0; i < arrayAnswer.length; i += 1) {
    if (answer.content === arrayAnswer[i].content) {
      return i;
    }
  }
  return -1;
}
