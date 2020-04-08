import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

import { nameOfPlayer, Player, PlayerNames } from 'src/models';
import { PerPlayer, Stats } from 'src/models/stats';
import './StatsViewer.css';

export const StatsViewer: FC<
    PlayerNames & {
        className?: string;
        value: Stats;
    }
> = ({ player1Name, player2Name, value, ...props }) => {
    const players = { player1Name, player2Name };
    return (
        <div className={classNames('c-stats-viewer', props.className)}>
            <ShareChart title="Wins" {...players} {...value.wins} />
            <ShareChart title="Max Streak" {...players} {...value.maxStreak} />
            <ShareChart title="Mean PPG" {...players} {...value.meanWinSize} />
            <ShareChart
                title="Biggest Win"
                {...players}
                {...value.biggestWin}
            />
        </div>
    );
};

const ShareChart: FC<
    PlayerNames &
        PerPlayer & {
            title: ReactNode;
        }
> = props => (
    <div className="c-share-chart">
        <h3>{props.title}</h3>
        {nameOfPlayer(props, Player.One)}: {formatNumber(props[Player.One])}
        <br />
        {nameOfPlayer(props, Player.Two)}: {formatNumber(props[Player.Two])}
        <br />
    </div>
);

const formatNumber = (value: number) =>
    value % 1 === 0 ? value.toString() : value.toFixed(2);
