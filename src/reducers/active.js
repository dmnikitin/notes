import { ACTIVE_NOTE, ACTIVE_TAG } from '../store/variables';

const ActiveReducer = (state = { activeNote: -1, activeTag: { value: 'allNotes', label: 'All Notes' } }, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTIVE_NOTE:
            return { activeNote: payload, activeTag: state.activeTag };
        case ACTIVE_TAG:
            return { activeNote: state.activeNote, activeTag: payload };
        default:
            return state;
    }
};

export default ActiveReducer;
