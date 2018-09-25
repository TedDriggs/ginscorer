import * as React from 'react';

import * as classNames from 'classnames';
import {
    GinSet,
    isSetFinished,
    nameOfPlayer,
    Player,
    PlayerNames,
} from '../../models';
import './Summary.css';

export interface SetSummaryProps extends PlayerNames {
    value: GinSet;
    onClick?(): void;
}

export const SetSummary: React.SFC<SetSummaryProps> = props => {
    const { value, onClick } = props;
    // If a player has won the set, don't show loser's points
    if (isSetFinished(value)) {
        return (
            <div
                className={classNames('c-set-summary', 'c-set-summary--final', {
                    'c-set-summary--clickable': Boolean(onClick),
                })}
                onClick={onClick}
            >
                <span className="c-set-summary--final__winner">
                    {nameOfPlayer(props, value.finalResult.winner)} won
                </span>
                <span className="c-set-summary--final__points">
                    {value.finalResult.points}
                </span>
            </div>
        );
    }

    return (
        <div
            className={classNames(
                'c-set-summary',
                'c-set-summary--in-progress',
                {
                    'c-set-summary--clickable': Boolean(onClick),
                },
            )}
            onClick={onClick}
        >
            <div className="c-set-summary__player">
                <span className="c-set-summary__player-name">
                    {props.player1Name}
                </span>
                <span className="c-set-summary__points">
                    {value.currentScores[Player.One]}
                </span>
            </div>
            <div className="c-set-summary__player">
                <span className="c-set-summary__player-name">
                    {props.player2Name}
                </span>
                <span className="c-set-summary__points">
                    {value.currentScores[Player.Two]}
                </span>
            </div>
        </div>
    );
};
