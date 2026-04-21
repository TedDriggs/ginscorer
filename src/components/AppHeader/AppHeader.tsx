import { FC } from 'react';
import classNames from 'classnames';

import './AppHeader.scss';

export const AppHeader: FC<{ className?: string }> = ({ className }) => (
    <header className={classNames('c-app-header', className)}>
        <h1>Gin Scorer</h1>
    </header>
);
