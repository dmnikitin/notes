import { createStore } from 'redux';
import combined from '../reducers/index';
import { getFromLocalStorage } from '../helpers/localStorageHandler';

/* globals window */
const localStorageData = getFromLocalStorage();
const store = createStore(combined, localStorageData);

window.store = store;
export default store;
