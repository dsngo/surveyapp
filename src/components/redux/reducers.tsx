import { combineReducers } from "redux";
import { ISurveyFormFromDatabase } from "../../types/customTypes";
import {
  ADD_QUESTION,
  FETCH_FORM_DATA_BY_ID,
  FETCH_RECENT_FORMS,
  REMOVE_QUESTION,
  SAVE_FORM_BY_ID,
  SET_SEARCH_TERM,
  UPDATE_QUESTION,
  UPDATE_STATE_STATUS,
  UPDATE_FORM_INFO,
} from "./actions";

// REDUCER FUNCTIONS
function addQuestionReducer(state: any, action: any) {
  return [...state, action.template];
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

function removeSectionBreakReducer(state: any, action: any) {
  return {
    ...state,
    sectionBreaks: state.sectionBreaks.filter(
      (e: any) => e.questionId !== action.questionId,
    ),
  };
}

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
  formInfo: {
    title: "",
    description: "",
    isDeleted: false,
    completed: false,
    author: { username: "daniel" },
  },
  formQuestions: [
    {
      questionId: Date.now().toString(36),
      questionType: "longQuestion",
      question: "",
      description: "",
      answers: [""],
    },
  ],
  // clientSurveyData: {
  //   completed: false,
  //   formId: "String",
  //   clientSurveyId: "String",
  //   author: { username: "daniel" },
  //   clientInfo: {
  //     firstName: "String",
  //     lastName: "String",
  //     email: "String",
  //     phone: "123456",
  //     address: "String",
  //     gender: "String",
  //   },
  //   contents: [
  //     {
  //       questionId: 135145,
  //       position: 1,
  //       questionType: "longQuestion",
  //       question: "defaukt stqetasrfasdf",
  //       description: "",
  //       answers: [""],
  //     },
  //   ],
  // },
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

const recentForms = (state = [], action: any) => {
  switch (action.type) {
    case FETCH_RECENT_FORMS:
      return [...action.recentForms] || state;
    default:
      return state;
  }
};

const formInfo = (state = DEFAULT_STATE.formInfo, action: any) => {
  switch (action.type) {
    case FETCH_FORM_DATA_BY_ID:
      return { ...state, ...action.formInfo };
    case "CREATE_NEW_FORM":
      return { ...DEFAULT_STATE.formInfo };
    case SAVE_FORM_BY_ID:
      return { ...state };
    case UPDATE_FORM_INFO:
      return {
        ...state,
        [action.infoKey]: action.value,
      };
    default:
      return { ...state };
  }
};

// const clientSurveyData = (
//   state = { author: {}, clientInfo: {}, contents: [] },
//   action: any,
// ) => {
//   switch (action.type) {
//     case FETCH_FORM_DATA_BY_ID:
//       return {
//         ...state,
//         contents: action.contents,
//       };
//     case SAVE_SURVEY_TO_DB:
//       return state;
//     case "UPDATE_CLIENT_INFO":
//       return {
//         ...state,
//         clientInfo: { ...state.clientInfo, [action.infoKey]: action.value },
//       };
//     default:
//       return state;
//   }
// };

const formQuestions = (state = [], action: any) => {
  switch (action.type) {
    case FETCH_FORM_DATA_BY_ID:
      return [...action.contents];
    case "CREATE_NEW_FORM":
      return [];
    case ADD_QUESTION:
      return addQuestionReducer(state, action);
    case REMOVE_QUESTION:
      return removeQuestionReducer(state, action);
    case UPDATE_QUESTION:
      return updateQuestionReducer(state, action);
    case "REPLACE_QUESTION":
      return replaceQuestionReducer(state, action);
    case SAVE_FORM_BY_ID:
      return [...state];
    default:
      return state;
  }
};

const stateStatus = (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_STATE_STATUS:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  brandName: () => "Survey Test Sites",
  searchTerm,
  recentForms,
  formInfo,
  // clientSurveyData,
  formQuestions,
  stateStatus,
});

export default rootReducer;
