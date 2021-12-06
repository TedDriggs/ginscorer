import classNames from 'classnames';
import { FC } from 'react';

import { GinMatchResult, nameOfPlayer, PlayerNames } from '../../models';
import { Button } from '../Button';
import './MatchResultViewer.scss';

export const MatchResultViewer: FC<
    GinMatchResult &
        PlayerNames & {
            className?: string;
            onNewMatch?(): void;
        }
> = props => (
    <div className={classNames('c-match-result-viewer', classNames)}>
        <div className="c-match-result-viewer__winner">
            {nameOfPlayer(props, props.winner)} wins!
        </div>
        <div className="c-match-result-viewer__points">
            <span className="c-match-result-viewer__points-value">
                {props.points}
            </span>
            &nbsp;
            <span className="c-match-result-viewer__points-label">points</span>
        </div>
        <div className="c-match-result-viewer__actions">
            {props.onNewMatch && (
                <Button onClick={props.onNewMatch}>Play again</Button>
            )}
        </div>
    </div>
);
