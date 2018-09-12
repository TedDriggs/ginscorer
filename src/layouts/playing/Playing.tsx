import * as React from 'react';
import { CommandBar } from '../../containers/CommandBar';
import { CurrentMatchViewer } from '../../containers/CurrentMatchViewer';

export const Playing: React.SFC = props => (
    <div className="l-playing">
        <CommandBar />
        <CurrentMatchViewer />
    </div>
);
