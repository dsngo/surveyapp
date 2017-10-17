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
  UPDATE_QUESTION_TYPE,
  UPDATE_TEMP_SURVEY_ID,
  GET_DATA_FROM_DB_BY_ID
} from "./actions";
import axios from "axios";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;
const clearMsgTimeout = config.CLEAR_MESSAGE_TIME;

export const setSearchTerm = (searchTerm: string) => ({
  searchTerm,
  type: SET_SEARCH_TERM,
});

// export const updateAnswer = (index: number, answer: string, multiAnswer: boolean) => ({
//   index,
//   answer,
//   multiAnswer,
//   type: UPDATE_ANSWER_RESPONSE,
// });

// export const submitResponse = (id: string) => {
//   return async (dispatch: any, getState: any) => {
//     const response = getState().surveyResponse;
//     response.survey_id = id;
//     const resSubmit = await axios.post(urlServer + "/client-survey", response);
//     if (!resSubmit.data.code) {
//       dispatch({
//         type: SUBMIT_SUCCESS,
//       });
//     }
//   };
// };

// ==================

// export const addNewQuestion = (questionIndex: number, questionType: any) => ({
//   questionIndex,
//   questionType,
//   type: ADD_NEW_QUESTION,
// });

export const addNewQuestion = (questionIndex: number) => (
  dispatch: any,
  getState: any,
) => {
  
  const questionType = getState().stateStatus.selectedQuestionType;
  dispatch({
    questionIndex,
    questionType,
    type: ADD_NEW_QUESTION
  })
}

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

export const updateSurveyInfo = (info: any) => ({
  info,
  type: UPDATE_INFO_SURVEY,
})

export const updateTempId = (id: string) => {
  console.log("XXX");
  
  return ({
    id,
    type: UPDATE_TEMP_SURVEY_ID
  })
} 

export const clearSubmitStatus = () => {
  return ({
    type: "CLEAR_SUBMIT_STATUS"
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
    type: "UPDATE_SECTION_BREAK",
  });
};

// API REQUESTS
export const getRecentFormsFromDb = (username = "Daniel") => async (dispatch: any) => {
  const { data: recentForms, message: submitStatus } = (await axios.get(`${urlServer}/survey/recent-forms`)).data;
  console.log(recentForms)
  dispatch({
    recentForms,
    type: "GET_RECENT_FORMS_FROM_DB",
  });
  dispatch({
    submitStatus,
    type: "UPDATE_SUBMIT_STATUS",
  });
};

export const getDataFromDbById = () => async (dispatch: any, getState: any) => {
  
  const formId = getState().stateStatus.tempId;
  const resData = (await axios.get(
    `${urlServer}/survey/${formId}`,
  )).data;
  console.log(`test:${JSON.stringify(resData)}`);
  console.log(resData);
  
  const { data: { contents: surveyContents, ...surveyInfo }, message: submitStatus } = resData;
  console.log(JSON.stringify(surveyContents));
  
  if (surveyContents) {
    console.log(surveyContents);
    dispatch({
      surveyContents,
      surveyInfo,
      type: GET_DATA_FROM_DB_BY_ID,
    });
  }
  // dispatch({
  //   submitStatus,
  //   type: "UPDATE_SUBMIT_STATUS",
  // });
};


export const saveFormToDb = (completed: boolean) => async (dispatch: any, getState: any) => {
  const contents = getState().surveyContents;
  const { formId, ...surveyInfo } = getState().surveyInfo;
  const formData = { ...surveyInfo, contents, completed };
  const resSubmit = (await (formId
    ? axios.put(`${urlServer}/survey/${formId}`, formData)
    : axios.post(`${urlServer}/survey`, formData))).data;
  const submitStatus = resSubmit.message;
  const id = resSubmit.data._id;
  console.log(resSubmit);
  if (submitStatus) {
    dispatch({
      formId: id,
      type: "SAVE_FORM_TO_DB",
    });
    dispatch({
      submitStatus,
      type: "UPDATE_SUBMIT_STATUS",
    });
  }
  
};

export const saveClientDataToDb = (clientSurveyId: string, isCompleted: boolean) => async (dispatch: any, getState: any) => {
  const clientSurveyData = getState().clientSurveyData;
  
  const { data: { message: submitStatus } } = (await (clientSurveyId
    ? axios.put(`${urlServer}/client-survey/${clientSurveyId}`, clientSurveyData)
    : axios.post(`${urlServer}/client-survey`, clientSurveyData))).data;
  if (submitStatus) {
    dispatch({
      type: "SAVE_SURVEY_TO_DB",
    })
    dispatch({
      submitStatus,
      type: "UPDATE_SUBMIT_STATUS",
    });
  }
  
};
