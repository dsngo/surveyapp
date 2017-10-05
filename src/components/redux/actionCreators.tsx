import axios from "axios";
import {
    SET_SEARCH_TERM,
    ADD_API_DATA,
    ADD_AREA,
    CHANGE_TYPE_ANSWER,
    DELETE_AREA,
    CHOOSE_AREA,
    CHANGE_QUESTION_DETAIL,
    ADD_MULTIPLE_CHOICE,
    UPDATE_MULTIPLE_CHOICE,
    DELETE_MULTIPLE_CHOICE,
    UPDATE_DESCRIPTION_AREA,
    DIVIDE_SECTION,
    CREATE_SURVEY,
    UPDATE_INFO_SURVEY,
    MISSING_INFO,
    CLEAR_MESSAGE,
    CREATE_SUCCESS,
    GET_SURVEY_ERROR,
    GET_SURVEY_SUCCESS,
    INIT_SURVEY_QUESTION,
    UPDATE_ANSWER_RESPONSE,
    SUBMIT_SUCCESS,
    CLEAR_SUBMIT_STATUS,
    GET_RECENT_FORMS,
    GET_SURVEY,
    GET_RESPONSES,
    CLEAR_SURVEY,
} from "./actions";
import store from "./store";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;
const clearMsgTimeout = config.CLEAR_MESSAGE_TIME;

export const setSearchTerm = (searchTerm: string) => ({
    searchTerm,
    type: SET_SEARCH_TERM,
});

// export const addArea = (area: any) => ({
//     area,
//     type: ADD_AREA,
// });

export const addArea = (area: any) => {
    return async (dispatch: any, getState: any) => {
        const currentArea = getState().currentArea;
        dispatch({
            area,
            currentArea,
            type: ADD_AREA,
        })
    }
}
export const changeTypeAnswer = (index: number, questionType: string) => ({
    index,
    questionType,
    type: CHANGE_TYPE_ANSWER,
});

export const deleteArea = (index: number) => ({
    index,
    type: DELETE_AREA,
});

export const chooseArea = (index: number) => ({
    index,
    type: CHOOSE_AREA,
});

export const addMultipleChoice = (index: number) => ({
    index,
    type: ADD_MULTIPLE_CHOICE,
});

export const updateMultipleChoice = (index: number, answerIndex: number, answerContent: string) => ({
    index,
    answerIndex,
    answerContent,
    type: UPDATE_MULTIPLE_CHOICE,
});

export const deleteMultipleChoice = (index: number, answerIndex: number) => ({
    index,
    answerIndex,
    type: DELETE_MULTIPLE_CHOICE,
});

export const changeQuestion = (index: number, value: string) => ({
    index,
    value,
    type: CHANGE_QUESTION_DETAIL,
});

export const updateDescriptionArea = (index: number, field: string, value: string) => ({
    index,
    field,
    value,
    type: UPDATE_DESCRIPTION_AREA,
});

export const divideSection = (value: boolean) => ({
    value,
    type: DIVIDE_SECTION,
});

export const saveSurvey = () => {
    return async (dispatch: any, getState: any) => {
        const surveyData = getState().surveyData;
        let msgError = "";
        if (!surveyData.info.description) msgError = "Please input your survey description.";
        if (!surveyData.info.title) msgError = "Please input your survey title";
        let checkMissing = false;
        surveyData.content.map((ctn: any) => {
            if (ctn.type === "description" && (!ctn.title || !ctn.description)) {
                checkMissing = true;
            }
            if (ctn.type === "question" && (ctn.questionType === "" || ctn.question === "")) checkMissing = true;
            if (
                ctn.type === "question" &&
                (ctn.questionType === "checkbox" || ctn.questionType === "multipleChoices" || ctn.questionType === "dropdown")
            ) {
                ctn.multipleAnswer.map((asw: any) => {
                    if (asw === "") {
                        checkMissing = true;
                    }
                });
            }
        });
        if (checkMissing) {
            msgError = "Please input your survey info.";
        }
        if (msgError) {
            dispatch({
                msgError,
                type: MISSING_INFO,
            });
            setTimeout(() => {
                dispatch({
                    type: CLEAR_MESSAGE,
                });
            }, 2000);
        } else {
            surveyData.action = "saved";
            let resSaveSurvey;
            if (!surveyData.info.id) {
                resSaveSurvey = await axios.post(urlServer + "/survey", surveyData);
            } else {
                resSaveSurvey = await axios.put(urlServer + "/survey/" + surveyData.info.id, surveyData);
            }
            dispatch({
                type: CREATE_SUCCESS,
            });
        }
    };
};

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const updateInfoSurvey = (field: string, value: string) => ({
    field,
    value,
    type: UPDATE_INFO_SURVEY,
});

export const getSurveySubmitById = (id: string) => {
    return async (dispatch: any, getState: any) => {
        const res = await axios.get(urlServer + "/survey/" + id);
        const data = res.data;
        if (data.code) {
            dispatch({
                type: GET_SURVEY_ERROR,
                message: data.message,
            });
        } else {
            dispatch({
                type: GET_SURVEY_SUCCESS,
                survey: data.data,
            });
            dispatch({
                type: INIT_SURVEY_QUESTION,
                survey: data.data,
            });
        }
    };
};

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

export const getSurveyById = (id: string) => {
    return async (dispatch: any, getState: any) => {
        const resGetById = await axios.get(urlServer + "/survey/" + id);
        if (resGetById.data.data) {
            dispatch({
                type: GET_SURVEY,
                survey: resGetById.data.data,
            });
            const resGetResponsesBySurvey = await axios.get(urlServer + "/client-survey/" + id);
            if (resGetResponsesBySurvey.data.data) {
                dispatch({
                    type: GET_RESPONSES,
                    responses: resGetResponsesBySurvey.data.data,
                });
            }
        }
    };
};
export const clearSubmitStatus = () => ({
    type: CLEAR_SUBMIT_STATUS,
});

export const getRecentForms = () => {
    return async (dispatch: any, getState: any) => {
        const resForms = await axios.get(urlServer + "/survey/index");
        const forms = resForms.data.data;

        dispatch({
            forms,
            type: GET_RECENT_FORMS,
        });
    };
};

export const clearSurvey = () => ({
    type: CLEAR_SURVEY,
});


// ==================

export const addNewQuestion = (questionIndex: number, questionData: any) => ({
    questionIndex,
    questionData,
    type: "ADD_NEW_QUESTION",
})

export const removeQuestion = (questionIndex: number) => ({
    questionIndex,
    type: "REMOVE_QUESTION",
})

export const updateQuestion = (questionIndex: number, questionData: any) => ({
    questionIndex,
    questionData,
    type: "UPDATE_QUESTION",
})
