import { combineReducers } from "redux";
import {
    SET_SEARCH_TERM,
    ADD_API_DATA,
    ADD_AREA,
    CHANGE_QUESTION_TYPE,
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
} from "../../types/customTypes";

// interface ISurveyForm {
//     info: { title: string; description: string };
//     contents: (
//         | ILongQuestion
//         | IShortQuestion
//         | IMultipleChoices
//         | IMultipleDropdown
//         | ICheckBox
//         | IDropdown
//         | IPriorityQuestion)[];
//     msgError: string;
//     msgSuccess: string;
// }

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

// const apiData = (state = {}, action: any) => (action.type === ADD_API_DATA ? { [action.apiData.id]: action.apiData } : state);

const surveyData = (
    state: ISurveyFormFromDatabase = {
        title: "",
        description: "",
        contents: [],
        author: { username: "son" },
        isDeleted: false,
        completed: false,
    },
    action: any,
) => {
    switch (action.type) {
        case CLEAR_SURVEY:
            return state;
        case UPDATE_INFO_SURVEY:
            state[action.field] = action.value;
            return state;
        case ADD_AREA:
            state.contents.splice(action.currentArea + 1, 0, action.area);
            return state;
        case CHANGE_QUESTION_DETAIL:
            if (action.questionType !== "multipleDropdown") {
                state.contents[action.index].question = action.value;
            } else {
                state.contents[action.index].questions[action.multipleDropdownId].question = action.value;
            }
            return state;
        case CHANGE_QUESTION_TYPE:
            state.contents[action.index].questionType = action.questionType;
            state.contents[action.index].multipleAnswer = [];
            if (
                action.questionType === "multipleChoices" ||
                action.questionType === "checkbox" ||
                action.questionType === "dropdown" ||
                action.questionType === "priority" ||
                action.questionType === "multipleDropdowns"
            )
                state.contents[action.index].multipleAnswer = [""];
            return state;
        case DELETE_AREA:
            state.contents.splice(action.index, 1);
            return state;
        case ADD_MULTIPLE_CHOICE:
            state.contents[action.index].multipleAnswer.push("");
            return state;
        case UPDATE_MULTIPLE_CHOICE:
            state.contents[action.index].multipleAnswer[action.answerIndex] = action.answerContent;
            return state;
        case DELETE_MULTIPLE_CHOICE:
            state.contents[action.index].multipleAnswer.splice(action.answerIndex, 1);
            return state;
        case UPDATE_DESCRIPTION_AREA:
            action.field === "title"
                ? (state.contents[action.index].title = action.value)
                : (state.contents[action.index].description = action.value);
            return state;
        case MISSING_INFO:
            state.msgError = action.msgError;
            return state;
        case CLEAR_MESSAGE:
            state.msgError = "";
            state.msgSuccess = "";
            return state;
        case CREATE_SUCCESS:
            state.msgSuccess = "success";
            return state;
        case GET_SURVEY:
            state.info.id = action.survey._id;
            state.info.title = action.survey.title;
            state.info.description = action.survey.description;
            state.contents = JSON.parse(action.survey.content);
            return state;
        case GET_RESPONSES:
            state.responses = action.responses;
            return state;
        default:
            return state;
    }
};

const surveySubmit = (state: IClientSurvey = { loading: true, surveyForm: {}, error: false, errorMsg: "" }, action: any) => {
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
            data.surveyForm = action.survey;
            return data;
        default:
            return state;
    }
};

const recentForms = (state: IRecentForms = { recentForms: [] }, action: any) => {
    const data = { ...state };
    switch (action.type) {
        case GET_RECENT_FORMS:
            data.recentForms = action.forms;
            return data;
        default:
            return state;
    }
};

const surveyResponse = (state: IClientSurveyAnswers = { answers: [] }, action: any) => {
    const data = { ...state };
    switch (action.type) {
        case INIT_SURVEY_QUESTION:
            data.answers = JSON.parse(action.survey.content);
            return data;
        case UPDATE_ANSWER_RESPONSE:
            const answer = {
                content: action.answer,
            };
            if (!action.multiAnswer) {
                data.answers[action.index].answer = answer;
                return data;
            }
            if (!data.answers[action.index].answer) {
                data.answers[action.index].answer = [answer];
                return data;
            }
            const index = checkAnswerExist(answer, data.answers[action.index].answer);
            if (index !== -1) {
                data.answers[action.index].answer.splice(index, 1);
                return data;
            }
            data.answers[action.index].answer.push(answer);
            return data;
        default:
            return state;
    }
};

const status = (state: IStatus = { submitStatus: "" }, action: any) => {
    const data = { ...state };
    switch (action.type) {
        case SUBMIT_SUCCESS:
            data.submitStatus = "success";
            return data;
        case CLEAR_SUBMIT_STATUS:
            data.submitStatus = "";
            return data;
        default:
            return state;
    }
};
const sectionDivide = (state: boolean = false, action: any) => (action.type === DIVIDE_SECTION ? action.value : state);

const currentArea = (state: number = -1, action: any) => (action.type === CHOOSE_AREA ? action.index : state);

function checkAnswerExist(answer: any, arrayAnswer: any) {
    for (let i = 0; i < arrayAnswer.length; i += 1) {
        if (answer.content === arrayAnswer[i].content) {
            return i;
        }
    }
    return -1;
}

const surveyContents = (state: {}[], action: any) => {
    action.type === "ADD_NEW_QUESTION" ? state.splice(action.questionIndex, 0, action.questionData) : state;
    action.type === "REMOVE_QUESTION" ? state.splice(action.questionIndex, 1) : state;
};

export const rootReducer = combineReducers({
    searchTerm,
    // apiData,
    surveyData,
    currentArea,
    surveySubmit,
    surveyResponse,
    status,
    recentForms,
    surveyContents,
});
