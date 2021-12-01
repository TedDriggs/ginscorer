import classNames from 'classnames';
import { identity } from 'lodash';
import React, { FC, ReactChild, ReactElement, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Action, creators } from 'src/Actions';

import { Gin, nameOfPlayer, otherPlayer, Player } from 'src/models';
import { PerPlayer, Stats } from 'src/models/stats';
import {
    dealerSelector,
    matchHasStartedSelector,
    playerNameSelector,
} from 'src/Reducer';
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
}) => {
    const players = useSelector(playerNameSelector);
    return (
        <div className="c-stats-viewer">
            {dealer !== undefined && (
                <div>Dealer: {nameOfPlayer(players, dealer)}</div>
            )}
            {renderStats(
                (title, v, formatter) => (
                    <StackRow title={title} value={v} formatter={formatter} />
                ),
                value,
            )}
        </div>
    );
};

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
                    <td className="c-stats-viewer--grid__player">
                        {nameOfPlayer(players, Player.One)}
                    </td>
                    <td>
                        {dealer !== undefined && (
                            <DealerToken dealer={dealer} />
                        )}
                    </td>
                    <td className="c-stats-viewer--grid__player">
                        {nameOfPlayer(players, Player.Two)}
                    </td>
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

const renderStats = (row: StatRowRenderer, value: Stats): ReactNode => (
    <>
        {row('Wins', value.wins, identity)}
        {row('Max Streak', value.maxStreak, identity)}
        {row('Mean PPG', value.meanWinSize, formatNumber)}
        {row('Biggest Win', value.biggestWin, identity)}
        {row('Gins', value.ginGames, formatGinCount)}
    </>
);

/**
 * Badge for the player who is currently the dealer in the stats grid.
 */
const DealerToken: FC<{ dealer: Player }> = ({ dealer }) => {
    const hasMatchStarted = useSelector(matchHasStartedSelector);
    const dispatch = useDispatch<Dispatch<Action>>();
    return (
        <div
            className={classNames(
                'c-dealer-token',
                dealer === Player.One
                    ? 'c-dealer-token--p1'
                    : 'c-dealer-token--p2',
            )}
            onClick={
                hasMatchStarted
                    ? undefined
                    : () =>
                          dispatch(
                              creators.SetInitialDealer(otherPlayer(dealer)),
                          )
            }
        >
            <span className="c-dealer-token__arrow c-dealer-token__arrow--p1">
                <Arrow direction="left" />
            </span>{' '}
            Dealer{' '}
            <span className="c-dealer-token__arrow c-dealer-token__arrow--p2">
                <Arrow direction="right" />
            </span>
        </div>
    );
};

/**
 * Platform-agnostic sideways-pointing arrow. ▶️, the right-pointing triangle
 * emoji, renders as a stylized play button on mobile operating systems which
 * is undesirable.
 */
const Arrow: FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <svg viewBox="0 0 5 6" width={10} height={12}>
        <path
            d="M 0 0 L 5 3 L 0 6 Z"
            style={{
                fill: 'var(--text-color)',
            }}
            transform={direction === 'left' ? 'rotate(180 2.5 3)' : undefined}
        ></path>
    </svg>
);
