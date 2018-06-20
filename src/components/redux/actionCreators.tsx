import axios from "axios";
import { DBSERVER } from "../ultis";
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

// ================= SEARCH FUNCTION
export const setSearchTerm = (searchTerm: string) => ({
  searchTerm,
  type: SET_SEARCH_TERM,
});

// ================= STATE STATUS
export const updateStateStatus = (key: string, value: any) => ({
  key,
  value,
  type: UPDATE_STATE_STATUS,
});

// ================= FORM INFOS

export const createNewForm = () => ({ type: "CREATE_NEW_FORM" });
export const updateFormInfo = (infoKey: string, value: any) => ({
  infoKey,
  value,
  type: UPDATE_FORM_INFO,
});

// ================= FORM QUESTIONS
export const addQuestion = (template: any, position = null) => ({
  template,
  position,
  type: ADD_QUESTION,
});
export const removeQuestion = (questionId: number) => ({
  questionId,
  type: REMOVE_QUESTION,
});
export const updateQuestion = (
  questionId: number,
  questionKey: string,
  value: any,
) => ({
  questionId,
  questionKey,
  value,
  type: UPDATE_QUESTION,
});
export const replaceQuestion = (questionId, template) => ({
  questionId,
  template,
  type: "REPLACE_QUESTION",
});

// ================= APIs
const API = DBSERVER.url;
export const fetchRecentForms = (username = "Daniel") => async (
  dispatch: any,
  getState,
) => {
  const { data: recentForms, message: value } = (await axios.get(
    `${API}/survey/recent`,
  )).data;
  const check = JSON.stringify(getState().recentForms).length === JSON.stringify(recentForms).length
  if (check) return;
  dispatch({
    recentForms,
    type: FETCH_RECENT_FORMS,
  });
  dispatch(updateStateStatus("statusText", value));
};

export const getFormDataById = (formId: string) => async (dispatch: any) => {
  const resData = (await axios.get(`${API}/survey/form/${formId}`)).data;
  if (resData.data) {
    const { contents, ...formInfo } = resData.data;
    dispatch({
      contents,
      formInfo,
      type: FETCH_FORM_DATA_BY_ID,
    });
  }
  dispatch(updateStateStatus("statusText", resData.message));
};
export const saveFormToDb = (completed: boolean) => async (
  dispatch: any,
  getState: any,
) => {
  const contents = getState().formQuestions;
  const { _id: formId, ...formInfo } = getState().formInfo;
  const formData = { ...formInfo, contents, completed };
  const { data, message: value } = (await (formId
    ? axios.put(`${API}/survey/form/${formId}`, formData)
    : axios.post(`${API}/survey`, formData))).data;
  if (value) {
    dispatch({
      formId: data,
      type: SAVE_FORM_BY_ID,
    });
    dispatch(updateStateStatus("statusText", value));
  }
};
// export const saveClientDataToDb = (
//   clientSurveyId: string,
//   isCompleted: boolean,
// ) => async (dispatch: any, getState: any) => {
//   const clientSurveyData = {
//     contents: getState().surveyContents,
//     completed: true,
//     surveyId: getState().formInfo._id,
//     clientInfo: getState().clientInfo,
//   };
//   const { message: value } = (await (clientSurveyId
//     ? axios.put(`${API}/client-survey/${clientSurveyId}`, clientSurveyData)
//     : axios.post(`${API}/client-survey`, clientSurveyData))).data;
//   if (value) {
//     dispatch({
//       type: SAVE_SURVEY_TO_DB,
//     });
//     dispatch(updateStateStatus("statusText", value));
//   }
// };

//// SECTION BREAK ===
// export const addSectionBreak = (
//   questionId: number,
//   title = "",
//   description = "",
//   bigBreak = false,
// ) => ({
//   questionId,
//   title,
//   description,
//   bigBreak,
//   type: "ADD_SECTION_BREAK",
// });
// export const removeSectionBreak = (questionId: number) => ({
//   questionId,
//   type: "REMOVE_SECTION_BREAK",
// });
// export const updateSectionBreak = (
//   questionId: number,
//   sectionKey: string,
//   value: any,
// ) => ({
//   questionId,
//   sectionKey,
//   value,
//   type: UPDATE_SECTION_BREAK,
// });
