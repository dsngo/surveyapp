import { combineReducers } from "redux";
import { SET_SEARCH_TERM, ADD_API_DATA, ADD_AREA, CHANGE_TYPE_ANSWER, DELETE_AREA, CHOOSE_AREA, CHANGE_QUESTION_DETAIL,
        ADD_MULTIPLE_CHOICE, UPDATE_MULTIPLE_CHOICE, DELETE_MULTIPLE_CHOICE,
        UPDATE_DESCRIPTION_AREA,
        DIVIDE_SECTION,
        UPDATE_INFO_SURVEY,
        MISSING_INFO, CLEAR_MESSAGE,
        CREATE_SUCCESS,
        GET_SURVEY_ERROR, GET_SURVEY_SUCCESS } from "./actions";


let initialSurveyData = [{
    type: "description",
    title: "",
    description: ""
}];

interface ISurveyData {
    info: object;
    content: any[];
    msgError: string;
    msgSuccess: string;
}

interface ISurveySubmit {
    loading: boolean;
    survey: any;
    error: boolean;
    errorMsg: string;
}

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const apiData = (state = {}, action: any) =>
    action.type === ADD_API_DATA ? { [action.apiData.id]: action.apiData } : state;

const surveyData = (state:ISurveyData = { info: { title: "", description: ""}, content: [], msgError: "", msgSuccess: ""}, action: any) => {
    let data = { ...state };
    switch (action.type) {
        case UPDATE_INFO_SURVEY:
            data.info[action.field] = action.value;
            return data;
        case ADD_AREA :
            data.content.push(action.area);
            return data;
        case CHANGE_QUESTION_DETAIL:
            data.content[action.index].question = action.value;
            return data;
        case CHANGE_TYPE_ANSWER :
            data.content[action.index].answer_type = action.answerType;
            data.content[action.index].multiple_answer = [];
            if (action.answerType === "multiple_choice" || action.answerType === "checkbox" || action.answerType === "dropdown") data.content[action.index].multiple_answer = [""];
            return data;
        case DELETE_AREA:
            data.content.splice(action.index, 1);
            return data;
        case ADD_MULTIPLE_CHOICE: 
            data.content[action.index].multiple_answer.push("");
            return data;
        case UPDATE_MULTIPLE_CHOICE:
            data.content[action.index].multiple_answer[action.answer_index] = action.answer;
            return data;
        case DELETE_MULTIPLE_CHOICE:
            data.content[action.index].multiple_answer.splice(action.answer_index, 1);
            return data;
        case UPDATE_DESCRIPTION_AREA:
            action.field === "title" ? data.content[action.index].title = action.value : data.content[action.index].description = action.value;
            return data;
        case MISSING_INFO:
            data.msgError = action.msgError;
            return data;
        case CLEAR_MESSAGE:
            data.msgError = "";
            data.msgSuccess = "";
            return data;
        case CREATE_SUCCESS:
            data.msgSuccess = "success";
            return data;
        
        default: 
            return state;
    }
}

const surveySubmit = (state: ISurveySubmit = { loading: true, survey: {}, error: false, errorMsg: ""}, action: any) => {
    let data = { ...state };
    switch (action.type) {
        case GET_SURVEY_ERROR:
            data.loading = false;
            data.error = true;
            data.errorMsg = action.message;
            return data;
        case GET_SURVEY_SUCCESS:
            data.loading = false;
            data.error = false;
            data.survey = action.survey;
            return data;
        default: 
            return state;
    } 
}

const sectionDivide = (state: boolean = false, action: any) => action.type === DIVIDE_SECTION ? action.value : state;

const currentArea = (state: number = -1, action: any) => action.type === CHOOSE_AREA ? action.index : state;

export const rootReducer = combineReducers({ searchTerm, apiData, surveyData, currentArea, surveySubmit });
