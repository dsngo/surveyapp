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
} from "./actions";
import axios from "axios";
// import * as Templates from "../../types/questionTemplate";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;
const clearMsgTimeout = config.CLEAR_MESSAGE_TIME;

// ================= API REQUESTS
export const getRecentFormsFromDb = (username = "Daniel") => async (dispatch: any) => {
  const { data: recentForms, message: submitStatus } = (await axios.get(`${urlServer}/survey/recent-forms`)).data;
  dispatch({
    recentForms,
    type: GET_RECENT_FORMS_FROM_DB,
  });
  dispatch({
    submitStatus,
    type: UPDATE_SUBMIT_STATUS,
  });
};

export const getDataFromDbById = (formId: string) => async (dispatch: any, getState: any) => {
  const resData = (await axios.get(`${urlServer}/survey/${formId}`)).data;
  const { data: { contents: surveyContents, _id: surveyId, ...surveyInfo }, message: submitStatus } = resData;
  if (surveyContents) {
    dispatch({
      surveyContents,
      surveyInfo,
      surveyId,
      type: GET_DATA_FROM_DB_BY_ID,
    });
    return surveyContents;
  }
};
export const saveFormToDb = (completed: boolean) => async (dispatch: any, getState: any) => {
  const contents = getState().surveyContents;
  const { _id: formId, ...surveyInfo } = getState().surveyInfo;
  const formData = { ...surveyInfo, contents, completed };
  const resSubmit = (await (formId
    ? axios.put(`${urlServer}/survey/${formId}`, formData)
    : axios.post(`${urlServer}/survey`, formData))).data;
  const submitStatus = resSubmit.message;
  const id = resSubmit.data._id;
  if (submitStatus) {
    dispatch({
      formId: id,
      type: SAVE_FORM_TO_DB,
    });
    dispatch({
      submitStatus,
      type: UPDATE_SUBMIT_STATUS,
    });
  }
};
export const saveClientDataToDb = (clientSurveyId: string, isCompleted: boolean) => async (dispatch: any, getState: any) => {
  const clientSurveyData = {
    contents: getState().surveyContents,
    completed: true,
    surveyId: getState().surveyInfo._id,
    clientInfo: getState().clientInfo,
  };
  const { message: submitStatus } = (await (clientSurveyId
    ? axios.put(`${urlServer}/client-survey/${clientSurveyId}`, clientSurveyData)
    : axios.post(`${urlServer}/client-survey`, clientSurveyData))).data;
  if (submitStatus) {
    dispatch({
      type: SAVE_SURVEY_TO_DB,
    });
    dispatch({
      submitStatus,
      type: UPDATE_SUBMIT_STATUS,
    });
  }
};

// ================= SEARCH FUNCTION
export const setSearchTerm = (searchTerm: string) => ({
  searchTerm,
  type: SET_SEARCH_TERM,
});

// ================= RESTFUL QUESTION FUNCTIONS
//// UTILITIES ===
export const updateSurveyInfo = (infoKey: string, value: any) => ({
  infoKey,
  value,
  type: UPDATE_SURVEY_INFO,
});
export const updateQuestionDetail = (questionId: number, detailKey: string, value: any) => ({
  questionId,
  detailKey,
  value,
  type: "UPDATE_QUESTION_DETAIL",
});
export const clearSurveyData = () => ({
  type: CLEAR_SURVEY,
});

//// SECTION BREAK ===
export const addSectionBreak = (questionId: number, title = "", description = "", bigBreak = false) => ({
  questionId,
  title,
  description,
  bigBreak,
  type: "ADD_SECTION_BREAK",
});
export const removeSectionBreak = (questionId: number) => ({
  questionId,
  type: "REMOVE_SECTION_BREAK",
});
export const updateSectionBreak = (questionId: number, sectionKey: string, value: any) => ({
  questionId,
  sectionKey,
  value,
  type: UPDATE_SECTION_BREAK,
});

//// QUESTION ===
export const addQuestion = (currentIndex: number, template: any) => ({
  currentIndex,
  template,
  type: ADD_QUESTION,
});
export const removeQuestion = (questionId: number) => ({
  questionId,
  type: REMOVE_QUESTION,
});
export const updateQuestion = (questionId: number, questionKey: string, value: any) => ({
  questionId,
  questionKey,
  value,
  type: UPDATE_QUESTION,
});

//// ANSWER ===
export const addAnswer = (questionId: number, newAnswer: any) => ({
  questionId,
  newAnswer,
  type: "ADD_ANSWER",
});
export const updateAnswer = (questionId: number, answerId: number, answerKey: string, value: any) => ({
  type: "UPDATE_ANSWER",
  questionId,
  answerId,
  answerKey,
  value,
});
export const removeAnswer = (questionId: number, answerId: number) => ({
  type: "REMOVE_ANSWER",
  answerId,
});
export const toggleAnswerChecker = (questionId: number, answerId: number, answerKey: string) => ({
  questionId,
  answerId,
  answerKey,
  type: "TOGGLE_ANSWER_CHECKER",
});

// TABLE
export const addColumn = (questionId: number, newColumn: any) => ({
  type: "ADD_COLUMN",
  questionId,
  newColumn,
})
export const removeColumn = (questionId: number, refId: any) => ({
  type: "REMOVE_COLUMN",
  questionId,
  refId,
})
export const updateColumn = (questionId: number, refId: number, columnKey: string, value: any) => ({
  type: "UPDATE_COLUMN",
  questionId,
  refId,
  columnKey,
  value,
})
export const addRow = (questionId: number, newRow: any) => ({
  type: "ADD_ROW",
  questionId,
  newRow,
})
export const removeRow = (questionId: number, rowId: number) => ({
  type: "REMOVE_ROW",
  questionId,
  rowId,
})
export const updateRow = (questionId: number, rowId: number, rowKey: string, value: any) => ({
  type: "UPDATE_ROW",
  questionId,
  rowId,
  rowKey,
  value,
})
// ================= UPDATE STATE STATUS
export const updateStateStatus = (statusKey: string, value: any) => ({
  statusKey,
  value,
  type: "UPDATE_STATE_STATUS",
});
export const clearSubmitStatus = () => ({
  type: CLEAR_SUBMIT_STATUS,
});

// ================= CLIENTSURVEY INFO
export const updateClientSurveyInfo = (infoKey: string, value: any) => ({
  infoKey,
  value,
  type: "UPDATE_CLIENT_INFO",
});
