import classNames from 'classnames';
import React, { FC } from 'react';

import './ScrollViewer.css';

export const ScrollViewer: FC<{
    className?: string;
    overflowX?: 'hidden' | 'auto';
    overflowY?: 'hidden' | 'auto';
}> = ({
    className,
    children,
    overflowX = 'auto' as 'auto',
    overflowY = 'auto' as 'auto',
}) => (
    <div
        className={classNames('c-scroll-viewer', className)}
        style={{ overflowX, overflowY }}
    >
        {children}
    </div>
);
