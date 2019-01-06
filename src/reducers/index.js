import { combineReducers } from 'redux';
import { NotesReducer } from './notes';
import { TagsReducer } from './tags';
import { ActiveReducer } from './active';


const combined = combineReducers({
    notes: NotesReducer,
    tags: TagsReducer,
    active: ActiveReducer
})

export { combined }