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
  SAVE_SURVEY_TO_DB
} from "./actions";
import axios from "axios";
import * as Templates from "../../types/questionTemplate";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;
const clearMsgTimeout = config.CLEAR_MESSAGE_TIME;

export const setSearchTerm = (searchTerm: string) => ({
  searchTerm,
  type: SET_SEARCH_TERM,
});

export const addNewQuestion = (questionIndex: number) => (
  dispatch: any,
  getState: any,
) => {
  const questionType = getState().stateStatus.selectedQuestionType;
  let template;
  if (questionType) {
    template = Templates[questionType];
  } else {
    template = Templates.shortQuestion;
  }
  const currentIndex = getState().stateStatus.currentIndex;
  dispatch({
    questionType,
    template,
    currentIndex: getState().stateStatus.currentIndex,
    type: ADD_NEW_QUESTION
  })
}

export const removeQuestion = (questionIndex: number) => ({
  questionIndex,
  type: REMOVE_QUESTION,
});

export const updateQuestion = (questionIndex: number, questionData: any) => (dispatch: any, getState: any) => {
  dispatch ({
    questionIndex,
    questionData,
    type: UPDATE_QUESTION,
  });
  dispatch({
    questionType: questionData.questionType,
    type: UPDATE_SELECTED_QUESTION_TYPE
  })
}


export const updateCurrentIndex = (currentIndex: number) => ({
  currentIndex,
  type: UPDATE_CURRENT_INDEX,
});

export const updateSurveyInfo = (info: any) => ({
  info,
  type: UPDATE_INFO_SURVEY,
})

export const updateTempId = (id: string) => {
  return ({
    id,
    type: UPDATE_TEMP_SURVEY_ID
  })
} 

export const clearSubmitStatus = () => {
  return ({
    type: CLEAR_SUBMIT_STATUS
  })
} 

export const clearSurveyData = () => {
  return ({
    type: CLEAR_SURVEY
  })
}

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
    type: UPDATE_SECTION_BREAK,
  });
};

// API REQUESTS
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
  const resData = (await axios.get(
    `${urlServer}/survey/${formId}`,
  )).data;
  const { data: { contents: surveyContents, ...surveyInfo }, message: submitStatus } = resData;
  if (surveyContents) {
    dispatch({
      surveyContents,
      surveyInfo,
      type: GET_DATA_FROM_DB_BY_ID,
    });
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
    surveyId: getState().surveyInfo._id
  }
  const { message: submitStatus } = (await (clientSurveyId
    ? axios.put(`${urlServer}/client-survey/${clientSurveyId}`, clientSurveyData)
    : axios.post(`${urlServer}/client-survey`, clientSurveyData))).data;
  if (submitStatus) {
    dispatch({
      type: SAVE_SURVEY_TO_DB,
    })
    dispatch({
      submitStatus,
      type: UPDATE_SUBMIT_STATUS,
    });
  }
};
// ================ CLIENTSURVEY INFO
export const updateFirstName = (firstName: string) => ({
  firstName,
  type: "UPDATE_FIRSTNAME",
})
export const updateLastName = (lastName: string) => ({
  lastName,
  type: "UPDATE_LASTNAME",
})
export const updateEmail = (email: string) => ({
  email,
  type: "UPDATE_EMAIL",
})
export const updatePhone = (phone: string) => ({
  phone,
  type: "UPDATE_PHONE",
})
export const updateAddress = (address: string) => ({
  address,
  type: "UPDATE_ADDRESS",
})
export const updateGender = (gender: string) => ({
  gender,
  type: "UPDATE_GENDER",
})
