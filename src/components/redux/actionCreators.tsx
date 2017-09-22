// import axios from "axios";
import { SET_SEARCH_TERM, ADD_API_DATA, ADD_AREA, CHANGE_TYPE_ANSWER, DELETE_AREA, CHOOSE_AREA,
        ADD_MULTIPLE_CHOICE, UPDATE_MULTIPLE_CHOICE, DELETE_MULTIPLE_CHOICE,
        UPDATE_DESCRIPTION_AREA,
        DIVIDE_SECTION } from "./actions";

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