import { ADD_NOTE, DELETE_NOTE, CHANGE_NOTE, ADD_TAG, ACTIVE_NOTE, ACTIVE_TAG } from './variables.js';

const addNote = (value) => {
    return {
        type: ADD_NOTE,
        payload: value
    }
}

const deleteNote = (noteIndex) => {
    return {
        type: DELETE_NOTE,
        payload: noteIndex
    }
}

const changeNote = (value, noteIndex) => {
    return {
        type: CHANGE_NOTE,
        payload: {noteIndex, value}
    }
}

const addTag = (value) => {
    return {
        type: ADD_TAG,
        payload: value
    }
}

const makeNoteActive = (value) => {
    return {
        type: ACTIVE_NOTE,
        payload: value
    }
}

const makeTagActive = (value) => {
    return {
        type: ACTIVE_TAG,
        payload: value
    }
}



export { addNote, deleteNote, changeNote, addTag, makeNoteActive, makeTagActive };