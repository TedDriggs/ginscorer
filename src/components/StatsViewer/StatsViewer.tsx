import { identity } from 'lodash';
import React, { FC, ReactChild, ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Gin, nameOfPlayer, Player } from 'src/models';
import { PerPlayer, Stats } from 'src/models/stats';
import { dealerSelector, playerNameSelector } from 'src/Reducer';
import './StatsViewer.css';

type StatRowRenderer = <T extends unknown>(
    title: ReactNode,
    value: PerPlayer<T>,
    formatter: (value: T) => ReactChild,
) => ReactNode;

export const StatsViewer: FC<{
    value: Stats;
    showDealer: boolean;
    layout: 'grid' | 'stack';
}> = ({ layout, value, showDealer }) => {
    const dealer = useSelector(dealerSelector);
    switch (layout) {
        case 'stack':
            return (
                <StatsStack
                    value={value}
                    dealer={showDealer ? dealer : undefined}
                />
            );
        case 'grid':
            return (
                <StatsGrid
                    value={value}
                    dealer={showDealer ? dealer : undefined}
                />
            );
    }
};

const StatsStack: FC<{ value: Stats; dealer: Player | undefined }> = ({
    value,
    dealer,
}) => (
    <div className="c-stats-viewer">
        {renderStats(
            (title, v, formatter) => (
                <StackRow title={title} value={v} formatter={formatter} />
            ),
            value,
            dealer,
        )}
    </div>
);

const StackRow = <T extends unknown>(props: {
    value: PerPlayer<T>;
    title: ReactNode;
    formatter(value: T): ReactChild;
}): ReactElement => {
    const players = useSelector(playerNameSelector);
    return (
        <div className="c-share-chart">
            <h3>{props.title}</h3>
            {nameOfPlayer(players, Player.One)}:{' '}
            {props.formatter(props.value[Player.One])}
            <br />
            {nameOfPlayer(players, Player.Two)}:{' '}
            {props.formatter(props.value[Player.Two])}
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

const StatsGrid: FC<{ value: Stats; dealer: Player | undefined }> = ({
    value,
    dealer,
}) => {
    const players = useSelector(playerNameSelector);

    return (
        <table className="c-stats-viewer c-stats-viewer--grid">
            <thead>
                <tr>
                    <td>{nameOfPlayer(players, Player.One)}</td>
                    <td></td>
                    <td>{nameOfPlayer(players, Player.Two)}</td>
                </tr>
            </thead>
            <tbody>
                {renderStats(
                    (title, v, formatter) => (
                        <StatsGridRow
                            title={title}
                            value={v}
                            formatter={formatter}
                        />
                    ),
                    value,
                    dealer,
                )}
            </tbody>
        </table>
    );
};

const StatsGridRow = <T extends unknown>(props: {
    value: PerPlayer<T>;
    title: ReactNode;
    formatter(value: T): ReactChild;
}): ReactElement => (
    <tr>
        <td>{props.formatter(props.value[Player.One])}</td>
        <td>{props.title}</td>
        <td>{props.formatter(props.value[Player.Two])}</td>
    </tr>
);

const renderStats = (
    row: StatRowRenderer,
    value: Stats,
    dealer: Player | undefined,
): ReactNode => (
    <>
        {dealer !== undefined &&
            row('Dealer', dealerAsStat(dealer), dealerToken)}
        {row('Wins', value.wins, identity)}
        {row('Max Streak', value.maxStreak, identity)}
        {row('Mean PPG', value.meanWinSize, formatNumber)}
        {row('Biggest Win', value.biggestWin, identity)}
        {row('Gins', value.ginGames, formatGinCount)}
    </>
);

const dealerAsStat = (dealer: Player): PerPlayer<boolean> => ({
    [Player.One]: dealer === Player.One,
    [Player.Two]: dealer === Player.Two,
});

const dealerToken = (isDealer: boolean): ReactChild => (isDealer ? '⚫️' : '');
