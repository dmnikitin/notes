import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './app';
import { saveToLocalStorage } from './helpers/localStorageHandler';

/* globals document */

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

export default Root;

store.subscribe(() => saveToLocalStorage(store.getState()));

render(<Root />, document.getElementById('app'));
