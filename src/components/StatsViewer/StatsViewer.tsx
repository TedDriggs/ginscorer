import { identity } from 'lodash';
import React, { FC, ReactChild, ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Gin, nameOfPlayer, Player } from 'src/models';
import { PerPlayer, Stats } from 'src/models/stats';
import { playerNameSelector } from 'src/Reducer';
import './StatsViewer.css';

export const StatsViewer: FC<{
    value: Stats;
}> = ({ value, ...props }) => (
    <div className="c-stats-viewer">
        <ShareChart title="Wins" {...value.wins} formatter={identity} />
        <ShareChart
            title="Max Streak"
            {...value.maxStreak}
            formatter={identity}
        />
        <ShareChart
            title="Mean PPG"
            {...value.meanWinSize}
            formatter={formatNumber}
        />
        <ShareChart
            title="Biggest Win"
            {...value.biggestWin}
            formatter={identity}
        />
        <ShareChart
            title="Gins"
            {...value.ginGames}
            formatter={formatGinCount}
        />
    </div>
);

const ShareChart = <T extends unknown>(
    props: PerPlayer<T> & {
        title: ReactNode;
        formatter(value: T): ReactChild;
    },
): ReactElement => {
    const players = useSelector(playerNameSelector);
    return (
        <div className="c-share-chart">
            <h3>{props.title}</h3>
            {nameOfPlayer(players, Player.One)}:{' '}
            {props.formatter(props[Player.One])}
            <br />
            {nameOfPlayer(players, Player.Two)}:{' '}
            {props.formatter(props[Player.Two])}
            <br />
        </div>
    );
};

const formatNumber = (value: number) =>
    value % 1 === 0 ? value.toString() : value.toFixed(2);

const formatGinCount = (value: {
    [Gin.Normal]: number;
    [Gin.Super]: number;
}): ReactChild => {
    const normals = value[Gin.Normal];
    const supers = value[Gin.Super];

    const normal = <span style={{ whiteSpace: 'nowrap' }}>{normals}★</span>;
    const superSpan = <span style={{ whiteSpace: 'nowrap' }}>{supers}★★</span>;

    if (normals && supers) {
        return (
            <>
                {normal} <span style={{ opacity: 0.5 }}>|</span> {superSpan}
            </>
        );
    } else if (normals) return normal;
    else if (supers) return superSpan;
    else return 0;
};
