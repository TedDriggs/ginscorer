import { FC } from 'react';

import classNames from 'classnames';
import { Bonus, GameInSet, Gin, GinSet, Player, PlayerNames } from 'src/models';
import './ScoreColumn.scss';

export const ScoreColumn: FC<
    PlayerNames & {
        className?: string;
        value: GinSet;
    }
> = ({ value, ...props }) => (
    <div className={classNames('c-scorecolumn', props.className)}>
        <div className="c-scorecolumn__header">
            <div className="c-scorecolumn__player">{props.player1Name}</div>
            <div className="c-scorecolumn__player">{props.player2Name}</div>
        </div>
        {value.games.map((game, index) => (
            <ScoreRow {...game} key={`game-${index}`} />
        ))}
        {value.bonuses.map((bonus, index) => (
            <BonusRow key={`bonus-${index}`} {...bonus} isFirst={index === 0} />
        ))}
    </div>
);

const ScoreRow: FC<GameInSet> = ({ winner, gin, runningTotal }) => {
    const winnerCell = (
        <div className="c-scorerow__winner" data-gin={gin} key="winner">
            {runningTotal}
            {gin !== Gin.None && (
                <span className="c-scorerow__winner__gin__star">
                    {' '}
                    {gin === Gin.Normal && '★'}
                    {gin === Gin.Super && '★★'}
                </span>
            )}
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

const BonusRow: FC<Bonus & { isFirst?: boolean }> = props => {
    const bonusCell = (
        <div className="c-bonusrow__recipient" key="winner">
            <span className="c-bonusrow__points">{props.points}</span>
            <span className="c-bonusrow__label">{props.label}</span>
        </div>
    );

    const loserCell = <div className="c-bonusrow__loser" key="loser" />;

    return (
        <div
            className={classNames('c-bonusrow', {
                'c-bonusrow--first': props.isFirst,
            })}
        >
            {props.player === Player.One
                ? [bonusCell, loserCell]
                : [loserCell, bonusCell]}
        </div>
    );
};
