import * as classNames from 'classnames';
import * as React from 'react';

import './ScrollViewer.css';

export interface ScrollViewerProps {
    className?: string;
    overflowX?: 'hidden';
    overflowY?: 'hidden';
}

export const ScrollViewer: React.SFC<ScrollViewerProps> = ({
    className,
    children,
    overflowX = 'auto',
    overflowY = 'auto',
}) => (
    <div
        className={classNames('c-scroll-viewer', className)}
        style={{ overflowX, overflowY }}
    >
        {children}
    </div>
);
