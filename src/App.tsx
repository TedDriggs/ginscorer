import * as React from 'react';
import './App.css';

import { ScoreColumn } from './components/ScoreColumn';
import { Game, Gin, Player, reduceSet } from './models';

const games: Game[] = [
    {
        winner: Player.Two,
        points: 10,
        gin: Gin.Normal,
    },
    {
        winner: Player.One,
        points: 20,
    },
    {
        winner: Player.Two,
        points: 3,
        gin: Gin.Super,
    },
    {
        winner: Player.Two,
        points: 90,
    }
];

class App extends React.Component {
    public render() {
        return (
            <ScoreColumn player1Name="Jaclyn" player2Name="Ted" value={reduceSet(games)} />
        );
    }
}

export default App;
