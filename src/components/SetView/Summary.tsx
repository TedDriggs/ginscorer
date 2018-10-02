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
    className?: string;
    value: GinSet;
    onClick?(): void;
}

export const SetSummary: React.SFC<SetSummaryProps> = props => {
    const { value, ...outerProps } = props;
    // If a player has won the set, don't show loser's points
    if (isSetFinished(value)) {
        return (
            <SetSummaryContainer {...outerProps} finished>
                <span className="c-set-summary--final__winner">
                    {nameOfPlayer(props, value.finalResult.winner)} won
                </span>
                <span className="c-set-summary--final__points">
                    {value.finalResult.points}
                </span>
            </SetSummaryContainer>
        );
    }

    return (
        <SetSummaryContainer {...outerProps}>
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
        </SetSummaryContainer>
    );
};

/**
 * Outer container element for the set summary.
 */
const SetSummaryContainer: React.SFC<
    Pick<SetSummaryProps, 'className' | 'onClick'> & { finished?: boolean }
> = ({ className, onClick, finished, children }) => (
    <div
        className={classNames(
            'c-set-summary',
            finished ? 'c-set-summary--final' : 'c-set-summary--in-progress',
            className,
            {
                'c-set-summary--clickable': Boolean(onClick),
            },
        )}
        onClick={onClick}
    >
        {children}
    </div>
);
