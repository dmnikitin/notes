
import { ADD_NOTE, DELETE_NOTE, CHANGE_NOTE, ACTIVE_NOTE, ACTIVE_TAG } from '../store/variables.js';



const ActiveReducer =  (state = {activeNote: -1, activeTag: {value: 'allNotes', label: 'All Notes'}}, action) => {

    const {type, payload} = action
    
    switch (type) {

        case ACTIVE_NOTE: return {activeNote: payload, activeTag: state.activeTag}
        case ACTIVE_TAG: return {activeNote: state.activeNote, activeTag: payload}
	      	
    }

    return state
}

export { ActiveReducer }

