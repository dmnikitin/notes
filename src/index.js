import React, { Component } from 'react';
import { render } from 'react-dom';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import App from './app.js';
import { saveToLocalStorage } from './helpers/localStorageHandler.js'

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

store.subscribe(()=>{
	saveToLocalStorage(store.getState())
})
render(<Root />, document.getElementById('app'));