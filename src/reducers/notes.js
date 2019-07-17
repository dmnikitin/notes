import { ADD_NOTE, DELETE_NOTE, CHANGE_NOTE } from '../store/variables';

const NotesReducer = (notesState = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_NOTE:
            return [...notesState, payload];
        case DELETE_NOTE:
            return [...notesState].filter((e, ind) => ind !== payload);
        case CHANGE_NOTE:
            {
                const array = [...notesState];
                array.splice(payload.noteIndex, 1, payload.value);
                return array;
            }
        default:
            return notesState;
    }
};

export default NotesReducer;
