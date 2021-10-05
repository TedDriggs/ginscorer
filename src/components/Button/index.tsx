import classNames from 'classnames';
import React from 'react';

import { consumeEvent } from '../util/Event';

import './Button.scss';

export const Button = React.forwardRef<
    { focus(): void },
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
        primary?: boolean;
        onClick?(): void;
    }
>((props, ref) => (
    <button
        {...props}
        ref={ref as any}
        className={classNames(
            'c-button',
            props.primary && 'c-button--primary',
            props.className,
        )}
        onClick={e => {
            if (e.button || !props.onClick) return;
            consumeEvent(e);
            props.onClick();
        }}
    />
));
