import { createStore } from 'redux';
import { combined } from '../reducers/index.js';
import { getFromLocalStorage } from '../helpers/localStorageHandler.js'

const localStorageData = getFromLocalStorage();
const store = createStore(combined, localStorageData)

window.store = store;
export {store}