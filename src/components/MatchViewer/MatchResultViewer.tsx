import * as React from 'react';

import * as classNames from 'classnames';
import { GinMatchResult, Player, PlayerNames } from 'src/models';
import { Button } from '../Button';
import './MatchResultViewer.css';

export interface MatchResultViewerProps extends GinMatchResult, PlayerNames {
    className?: string;
    onNewMatch?(): void;
}

export const MatchResultViewer: React.SFC<MatchResultViewerProps> = props => (
    <div className={classNames('c-match-result-viewer', classNames)}>
        <div className="c-match-result-viewer__winner">
            {props.winner === Player.One
                ? props.player1Name
                : props.player2Name}
            {' '}wins!
        </div>
        <div className="c-match-result-viewer__points">
            <span className="c-match-result-viewer__points-value">{props.points}</span>
            &nbsp;
            <span className="c-match-result-viewer__points-label">points</span>
        </div>
        <div className="c-match-result-viewer__actions">
            {props.onNewMatch && <Button onClick={props.onNewMatch}>Play again</Button>}
        </div>
    </div>
);
