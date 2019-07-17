import {
    ADD_NOTE,
    DELETE_NOTE,
    CHANGE_NOTE,
    ADD_TAG,
    ACTIVE_NOTE,
    ACTIVE_TAG,
} from './variables';

const addNote = value => ({
    type: ADD_NOTE,
    payload: value,
});

const deleteNote = noteIndex => ({
    type: DELETE_NOTE,
    payload: noteIndex,
});

const changeNote = (value, noteIndex) => ({
    type: CHANGE_NOTE,
    payload: { noteIndex, value },
});

const addTag = value => ({
    type: ADD_TAG,
    payload: value,
});

const makeNoteActive = value => ({
    type: ACTIVE_NOTE,
    payload: value,
});

const makeTagActive = value => ({
    type: ACTIVE_TAG,
    payload: value,
});

export {
    addNote,
    deleteNote,
    changeNote,
    addTag,
    makeNoteActive,
    makeTagActive,
};
