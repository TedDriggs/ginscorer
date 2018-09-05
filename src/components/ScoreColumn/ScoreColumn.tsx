import * as React from 'react';

import { GameInSet, Gin, GinSet, Player } from 'src/models';
import './ScoreColumn.css';

export interface ScoreColumnProps {
    player1Name: string;
    player2Name: string;
    value: GinSet;
}

export const ScoreColumn: React.SFC<ScoreColumnProps> = props => {
    const games = props.value.games.map((game, index) => (
        <ScoreRow {...game} key={`game-${index}`} />
    ));

    return (
        <div className="c-scorecolumn">
            <div className="c-scorecolumn__header">
                <div className="c-scorecolumn__player">{props.player1Name}</div>
                <div className="c-scorecolumn__player">{props.player2Name}</div>
            </div>
            {games}
        </div>
    );
};

const ScoreRow: React.SFC<GameInSet> = ({ winner, gin, runningTotal }) => {
    const winnerCell = (
        <div className="c-scorerow__winner" data-gin={gin} key="winner">
            {runningTotal}
            {gin === Gin.Normal && '*'}
            {gin === Gin.Super && '**'}
        </div>
    );
    const loserCell = <div className="c-scorerow__loser" key="loser" />;

    return (
        <div className="c-scorerow">
            {winner === Player.One
                ? [winnerCell, loserCell]
                : [loserCell, winnerCell]}
        </div>
    );
};
