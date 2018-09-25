import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import { Playing } from './layouts/playing';
import { reducer } from './Reducer';
import { INITIAL_STATE } from './State';

const store = createStore(
    reducer,
    INITIAL_STATE,
    // Hook enhancer for redux dev-tools
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
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
