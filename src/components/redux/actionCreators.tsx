import axios from "axios";
import { SET_SEARCH_TERM, ADD_API_DATA, ADD_AREA, CHANGE_TYPE_ANSWER, DELETE_AREA, CHOOSE_AREA,
        ADD_MULTIPLE_CHOICE, UPDATE_MULTIPLE_CHOICE, DELETE_MULTIPLE_CHOICE,
        UPDATE_DESCRIPTION_AREA,
        DIVIDE_SECTION,
        CREATE_SURVEY,
        UPDATE_INFO_SURVEY,
        MISSING_INFO, CLEAR_ERROR_MSG,
        CREATE_SUCCESS } from "./actions";
import store from "./store";

const config = require("../../config.json");
const urlServer = config.URL_SERVER_API;


export const setSearchTerm = (searchTerm: string) => ({
    searchTerm,
    type: SET_SEARCH_TERM,
});

export const addArea = (area: any) => ({
    area,
    type: ADD_AREA
});

export const changeTypeAnswer = (index: number, answerType: string) => ({
    index,
    answerType,
    type: CHANGE_TYPE_ANSWER
})

export const deleteArea = (index: number) => ({
    index,
    type: DELETE_AREA
})

export const chooseArea = (index: number) => ({
    index,
    type: CHOOSE_AREA
})

export const addMultipleChoice = (index: number) => ({
    index,
    type: ADD_MULTIPLE_CHOICE
})

export const updateMultipleChoice = (index: number, answer_index: number, answer: string) => ({
    index,
    answer_index,
    answer,
    type: UPDATE_MULTIPLE_CHOICE
})

export const deleteMultipleChoice = (index: number, answer_index: number) => ({
    index,
    answer_index,
    type: DELETE_MULTIPLE_CHOICE
})

export const updateDescriptionArea = (index: number, field: string, value: string) => ({
    index,
    field,
    value,
    type: UPDATE_DESCRIPTION_AREA
})

export const divideSection = (value: boolean) => ({
    value,
    type: DIVIDE_SECTION
})

export const createSurvey = () => {
    return async (dispatch: any, getState: any) => {
        const surveyData = getState().surveyData;
        let msgError = "";
        if (!surveyData.info.description) msgError = "Please input your survey description.";
        if (!surveyData.info.title) msgError = "Please input your survey title";
        let checkMissing = false;
        surveyData.content.map((ctn: any) => {
            if ((ctn.type === "description") && (!ctn.title || !ctn.description)){
                checkMissing = true;
            }
            if ((ctn.type === "question") && (ctn.answer_type === "checkbox" || ctn.answer_type === "multiple_choice" || ctn.answer_type === "dropdown" )) {
                ctn.multiple_answer.map((asw: any) => {
                    if (asw === "") {
                        checkMissing = true;
                    }
                })
            }
        })
        if (checkMissing) {
            msgError = "Please input your survey info.";
        }
        if (msgError) {
            dispatch({
                type: MISSING_INFO,
                msgError
            });
            setTimeout(() => {
                dispatch({ type: CLEAR_ERROR_MSG })
            }, 2000)
        } 
        else {
            let resCreate = await axios.post(urlServer + "/api/v1/survey/create", surveyData);
            dispatch({
                type: CREATE_SUCCESS
            });
        }
    }
}

async function ajaxCreateSurvey(data: any) {
    
}

export const updateInfoSurvey = (field: string, value: string) => ({
    field,
    value,
    type: UPDATE_INFO_SURVEY
})

