import * as React from 'react';

import './AppHeader.css';

export interface AppHeaderProps {}

export const AppHeader: React.SFC<AppHeaderProps> = props => (
    <header className="c-app-header">
        <h1>Gin Scorer</h1>
    </header>
);
