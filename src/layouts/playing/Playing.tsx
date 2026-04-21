import { FC } from 'react';

import { AppHeader } from '../../components/AppHeader';
import { CommandBar } from '../../containers/CommandBar';
import { CurrentMatchViewer } from '../../containers/CurrentMatchViewer';

import './Playing.scss';

export const Playing: FC = props => (
    <div className="l-playing">
        <AppHeader className="l-playing__column-item" />
        <CommandBar className="l-playing__column-item" />
        <CurrentMatchViewer className="l-playing__column-item" />
    </div>
);
