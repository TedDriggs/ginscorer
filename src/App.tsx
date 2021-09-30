import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import './App.css';

import { retrieveState } from './Effects';
import { Playing } from './layouts/playing';
import { reducer } from './Reducer';
import { INITIAL_STATE } from './State';

// XXX figure out why this didn't work.
const devtools = () =>
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export const middleware = compose(applyMiddleware(devtools), install());

const store = createStore(
    reducer,
    retrieveState() || INITIAL_STATE,
    // Hook enhancer for redux dev-tools
    install(),
);

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <Playing />
            </Provider>
        );
    }
}

export default App;
