import { combineReducers } from "redux";
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


import {
    ISurveyFormFromDatabase,
    ILongQuestion,
    IShortQuestion,
    IMultipleChoices,
    IMultipleDropdown,
    ICheckBox,
    IDropdown,
    IPriorityQuestion,
    ISurveyData,
    ISurveySubmit,
    ISurveyResponse
} from "../../types/customTypes";
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
    answers: (
        | ILongQuestion
        | IShortQuestion
        | IMultipleChoices
        | IMultipleDropdown
        | ICheckBox
        | IDropdown
        | IPriorityQuestion)[];
    completed: boolean;
}


const DEFAULT_STATE = {
    searchTerm: "",
    apiData: {},
    surveyInfo: {},
    surveyContents: [],
    clientSurveyData: {},
    status: {},
};

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const apiData = (state = {}, action: any) => (action.type === ADD_API_DATA ? { [action.apiData.id]: action.apiData } : state);
const surveyData = (
    state: ISurveyData = {
        info: { title: "", id: "", description: "" },
        content: [],
        msgError: "",
        msgSuccess: "",
        responses: [],
    },
    action: any,
) => {
    const data = { ...state };
    switch (action.type) {
        case CLEAR_SURVEY:
            data.info = {
                title: "",
                id: "",
                description: "",
            };
            data.content = [];
            data.msgError = "";
            data.msgSuccess = "";
            data.responses = [];
            return data;
        case UPDATE_INFO_SURVEY:
            data.info[action.field] = action.value;
            return data;
        case ADD_AREA:
            data.content.splice(action.currentArea + 1, 0, action.area);
            return data;
        case CHANGE_QUESTION_DETAIL:
            data.content[action.index].question = action.value;
            return data;
        case CHANGE_TYPE_ANSWER:
            data.content[action.index].questionType = action.questionType;
            data.content[action.index].multipleAnswer = [];
            if (
                action.questionType === "multipleChoices" ||
                action.questionType === "checkbox" ||
                action.questionType === "dropdown" ||
                action.questionType === "priority" ||
                action.questionType === "multiDropdown"
            )
                data.content[action.index].multipleAnswer = [""];
            return data;
        case DELETE_AREA:
            data.content.splice(action.index, 1);
            return data;
        case ADD_MULTIPLE_CHOICE:
            data.content[action.index].multipleAnswer.push("");
            return data;
        case UPDATE_MULTIPLE_CHOICE:
            data.content[action.index].multipleAnswer[action.answerIndex] = action.answerContent;
            return data;
        case DELETE_MULTIPLE_CHOICE:
            data.content[action.index].multipleAnswer.splice(action.answerIndex, 1);
            return data;
        case UPDATE_DESCRIPTION_AREA:
            action.field === "title"
                ? (data.content[action.index].title = action.value)
                : (data.content[action.index].description = action.value);
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
        case GET_SURVEY:
            data.info.id = action.survey._id;
            data.info.title = action.survey.title;
            data.info.description = action.survey.description;
            data.content = JSON.parse(action.survey.content);
            return data;
        case GET_RESPONSES:
            data.responses = action.responses;
            return data;
        default:
            return state;
    }
};

const surveySubmit = (state: ISurveySubmit = { loading: true, survey: {}, error: false, errorMsg: "" }, action: any) => {
    const data = { ...state };
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
};

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

const surveyResponse = (state: ISurveyResponse = { question: [] }, action: any) => {
    const data = { ...state };
    switch (action.type) {
        case INIT_SURVEY_QUESTION:
            data.question = JSON.parse(action.survey.content);
            return data;
        case UPDATE_ANSWER_RESPONSE:
            const answer = {
                content: action.answer,
            };
            if (!action.multiAnswer) {
                data.question[action.index].answer = answer;
                return data;
            }
            if (!data.question[action.index].answer) {
                data.question[action.index].answer = [answer];
                return data;
            }
            const index = checkAnswerExist(answer, data.question[action.index].answer);
            if (index !== -1) {
                data.question[action.index].answer.splice(index, 1);
                return data;
            }
            data.question[action.index].answer.push(answer);
            return data;
        default:
            return state;
    }
};

const status = (state: IStatus = { 
    submitStatus: { error: false, message: "" }, 
    creationFormStatus: { error: false, message: ""},  
    clientSurveyStatus: { error: false, message: "", isLoading: false }
}, action: any) => {
    const data = { ...state };
    switch (action.type) {
        case SUBMIT_SUCCESS:
            data.submitStatus.message = "success";
            return data;
        case CLEAR_SUBMIT_STATUS:
            data.submitStatus.message = "";
            return data;
        default:
            return state;
    }
};

const surveyContents = (state: {}[], action: any) => {
    action.type === "ADD_NEW_QUESTION" ? state.splice(action.questionIndex, 0, action.questionData) : state;
    action.type === "REMOVE_QUESTION" ? state.splice(action.questionIndex, 1) : state;
    action.type === "UPDATE_QUESTION" ? state.splice(action.questionIndex, 1, action.questionData): state;
};

const sectionDivide = (state: boolean = false, action: any) => (action.type === DIVIDE_SECTION ? action.value : state);

const currentArea = (state: number = -1, action: any) => (action.type === CHOOSE_AREA ? action.index : state);

export const rootReducer = combineReducers({
    searchTerm,
    apiData,
    surveyData,
    currentArea,
    surveySubmit,
    surveyResponse,
    status,
    recentForms,
});

function checkAnswerExist(answer: any, arrayAnswer: any) {
    for (let i = 0; i < arrayAnswer.length; i += 1) {
        if (answer.content === arrayAnswer[i].content) {
            return i;
        }
    }
    return -1;
}
