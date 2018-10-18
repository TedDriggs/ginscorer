import * as classNames from 'classnames';
import * as React from 'react';

import { nameOfPlayer, Player, PlayerNames } from 'src/models';
import { PerPlayer, Stats } from 'src/models/stats';

export interface StatsViewerProps extends PlayerNames {
    className?: string;
    value: Stats;
}

export class StatsViewer extends React.Component<StatsViewerProps> {
    public render(): React.ReactNode {
        const { player1Name, player2Name, value, ...props } = this.props;
        const players = { player1Name, player2Name };
        return (
            <div className={classNames('c-stats-viewer', props.className)}>
                <h3>Wins</h3>
                <ShareChart {...players} {...value.wins} />
                <h3>Max Streak</h3>
                <ShareChart {...players} {...value.maxStreak} />
                <h3>Mean PPG</h3>
                <ShareChart {...players} {...value.meanWinSize} />
                <h3>Biggest Win</h3>
                <ShareChart {...players} {...value.biggestWin} />
            </div>
        );
    }
}

export const ShareChart: React.SFC<PlayerNames & PerPlayer> = props => (
    <div className="c-share-chart">
        {nameOfPlayer(props, Player.One)}: {formatNumber(props[Player.One])}
        <br />
        {nameOfPlayer(props, Player.Two)}: {formatNumber(props[Player.Two])}
        <br />
    </div>
);

const formatNumber = (value: number) =>
    value % 1 === 0 ? value.toString() : value.toFixed(2);
