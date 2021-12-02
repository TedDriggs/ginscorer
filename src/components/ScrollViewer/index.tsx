import classNames from 'classnames';
import { FC } from 'react';

import './ScrollViewer.scss';

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
