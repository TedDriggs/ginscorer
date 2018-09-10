import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import { CurrentMatchViewer } from './containers/CurrentMatchViewer';
import { Game, Gin, Player } from './models';
import { reducer } from './Reducer';
import { INITIAL_STATE } from './State';

const games: Game[] = [
    {
        winner: Player.Two,
        points: 10,
        gin: Gin.Normal,
    },
    {
        winner: Player.One,
        points: 20,
        gin: Gin.None,
    },
    {
        winner: Player.Two,
        points: 3,
        gin: Gin.Super,
    },
    {
        winner: Player.Two,
        points: 90,
        gin: Gin.None,
    },
];

const store = createStore(
    reducer,
    {
        ...INITIAL_STATE,
        player1Name: 'Jaclyn',
        player2Name: 'Ted',
        games,
    },
    // Hook enhancer for redux dev-tools
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <CurrentMatchViewer />
            </Provider>
        );
    }
}

export default App;
