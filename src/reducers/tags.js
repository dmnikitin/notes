import { ADD_TAG } from '../store/variables';

const TagsReducer = (tagsState = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TAG:
            return [...tagsState, payload];
        default:
            return tagsState;
    }
};

export default TagsReducer;
