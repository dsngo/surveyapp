import { combineReducers } from "redux";
import { SET_SEARCH_TERM, ADD_API_DATA, ADD_AREA, CHANGE_TYPE_ANSWER, DELETE_AREA, CHOOSE_AREA,
         ADD_MULTIPLE_CHOICE, UPDATE_MULTIPLE_CHOICE, DELETE_MULTIPLE_CHOICE,
         UPDATE_DESCRIPTION_AREA,
         DIVIDE_SECTION } from "./actions";


let initialSurveyData = [{
    type: "description",
    title: "",
    description: ""
}];

const searchTerm = (state = "", action: any) => (action.type === SET_SEARCH_TERM ? action.searchTerm : state);

const apiData = (state = {}, action: any) =>
    action.type === ADD_API_DATA ? { [action.apiData.id]: action.apiData } : state;


const surveyData = (state: any[] = initialSurveyData, action: any) => {
    let data = state.slice();
    switch (action.type) {
        case ADD_AREA :
            data.push(action.area);
            return data;
        case CHANGE_TYPE_ANSWER :
            data[action.index].answer_type = action.answerType;
            data[action.index].multiple_answer = [];
            if (action.answerType === "multiple_choice" || action.answerType === "checkbox") data[action.index].multiple_answer = [""];
            return data;
        case DELETE_AREA:
            data.splice(action.index, 1);
            return data;
        case ADD_MULTIPLE_CHOICE: 
            data[action.index].multiple_answer.push("");
            return data;
        case UPDATE_MULTIPLE_CHOICE:
            data[action.index].multiple_answer[action.answer_index] = action.answer;
            return data;
        case DELETE_MULTIPLE_CHOICE:
            data[action.index].multiple_answer.splice(action.answer_index, 1);
            return data;
        case UPDATE_DESCRIPTION_AREA:
            action.field === "title" ? data[action.index].title = action.value : data[action.index].description = action.value;
            return data;
        default: 
            return state;
    }
}

const sectionDivide = (state: boolean = false, action: any) => action.type === DIVIDE_SECTION ? action.value : state;

const currentArea = (state: number = -1, action: any) => action.type === CHOOSE_AREA ? action.index : state;

export const rootReducer = combineReducers({ searchTerm, apiData, surveyData, currentArea });
