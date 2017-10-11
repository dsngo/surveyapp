import {
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
import axios from "axios";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;
const clearMsgTimeout = config.CLEAR_MESSAGE_TIME;

export const setSearchTerm = (searchTerm: string) => ({
  searchTerm,
  type: SET_SEARCH_TERM,
});

export const updateAnswer = (index: number, answer: string, multiAnswer: boolean) => ({
  index,
  answer,
  multiAnswer,
  type: UPDATE_ANSWER_RESPONSE,
});

export const submitResponse = (id: string) => {
  return async (dispatch: any, getState: any) => {
    const response = getState().surveyResponse;
    response.survey_id = id;
    const resSubmit = await axios.post(urlServer + "/client-survey", response);
    if (!resSubmit.data.code) {
      dispatch({
        type: SUBMIT_SUCCESS,
      });
    }
  };
};

// ==================

export const addNewQuestion = (questionIndex: number, questionType: any) => ({
  questionIndex,
  questionType,
  type: ADD_NEW_QUESTION,
});

export const removeQuestion = (questionIndex: number) => ({
  questionIndex,
  type: REMOVE_QUESTION,
});

export const updateQuestion = (questionIndex: number, questionData: any) => ({
  questionIndex,
  questionData,
  type: UPDATE_QUESTION,
});

export const updateCurrentIndex = (currentIndex: number) => ({
  currentIndex,
  type: "UPDATE_CURRENT_INDEX",
});

export const updateSelectedQuestionType = (questionType: string) => ({
  questionType,
  type: "UPDATE_SELECTED_QUESTION_TYPE",
});

export const updateSectionBreaks = (currentIndex: number, title: string, description: string, bigBreak: boolean) => (
  dispatch: any,
  getState: any,
) => {
  const { sectionBreaks } = getState().surveyInfo;
  const test = sectionBreaks.findIndex((e: any) => e.index === currentIndex);
  const section = { title, description, bigBreak, index: currentIndex };
  if (test > 0) {
    sectionBreaks[test] = section;
  } else {
    sectionBreaks.push(section);
  }
  dispatch({
    sectionBreaks,
    type: "UPDATE_SECTION_BREAK",
  });
};

// API REQUESTS
export const getRecentFormsFromDb = (username = "Daniel") => async (dispatch: any) => {
  const recentForms = (await axios.get(`${urlServer}/survey/index`)).data.data;
  dispatch({
    recentForms,
    type: "GET_RECENT_FORMS_FROM_DB",
  });
};

export const getDataFromDb = (username = "Daniel") => async (dispatch: any, getState: any) => {
  const { formId } = getState().surveyInfo;
  const { data: { contents: surveyContents, ...surveyInfo }, message: submitStatus } = (await axios.get(
    `${urlServer}/survey/${formId}`,
  )).data;
  if (surveyContents) {
    dispatch({
      surveyContents,
      surveyInfo,
      type: "GET_DATA_FROM_DB",
    });
  }
  dispatch({
    submitStatus,
    type: "UPDATE_SUBMIT_STATUS",
  });
};

export const saveFormToDb = () => async (dispatch: any, getState: any) => {
  const contents = getState().surveyContents;
  const { formId, ...surveyInfo } = getState().surveyInfo;
  const formData = { ...surveyInfo, contents };
  const submitStatus = await (formId
    ? axios.put(`${urlServer}/survey/${formId}`, formData)
    : axios.post(`${urlServer}/survey`, formData));
  dispatch({
    type: "SAVE_FORM_TO_DB",
  });
  dispatch({
    submitStatus,
    type: "UPDATE_SUBMIT_STATUS",
  });
};
