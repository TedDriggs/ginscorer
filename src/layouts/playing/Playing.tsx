import React, { FC } from 'react';

import { AppHeader } from '../../components/AppHeader';
import { CommandBar } from '../../containers/CommandBar';
import { CurrentMatchViewer } from '../../containers/CurrentMatchViewer';

import './Playing.css';

export const Playing: FC = props => (
    <div className="l-playing">
        <AppHeader />
        <CommandBar />
        <CurrentMatchViewer />
    </div>
);
