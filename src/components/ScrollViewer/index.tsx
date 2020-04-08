import classNames from 'classnames';
import React from 'react';

import './ScrollViewer.css';

export interface ScrollViewerProps {
    className?: string;
    overflowX?: 'hidden' | 'auto';
    overflowY?: 'hidden' | 'auto';
}

export const ScrollViewer: React.SFC<ScrollViewerProps> = ({
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
