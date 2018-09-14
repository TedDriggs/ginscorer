import * as React from 'react';

import * as classNames from 'classnames';
import { GinMatchResult, Player, PlayerNames } from 'src/models';

export interface MatchResultViewerProps extends GinMatchResult, PlayerNames {
    className?: string;
}

export const MatchResultViewer: React.SFC<MatchResultViewerProps> = props => (
    <div className={classNames('c-match-result-viewer', classNames)}>
        <span className="c-match-result-viewer__winner">
            {props.winner === Player.One
                ? props.player1Name
                : props.player2Name}
        </span>
        <span className="c-match-result-viewer__points">{props.points}</span>
    </div>
);
