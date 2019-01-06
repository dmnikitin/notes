import { ADD_TAG } from '../store/variables.js';

const TagsReducer =  (tagsState = [], action) => {

    const {type, payload} = action
    
    switch (type) {

        case ADD_TAG: return [...tagsState, payload]
      
      	
    }

    return tagsState
}

export { TagsReducer }