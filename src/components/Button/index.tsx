import classNames from 'classnames';
import React from 'react';

import { consumeEvent } from '../util/Event';

import './Button.scss';

export const Button = React.forwardRef<
    { focus(): void },
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
        primary?: boolean;
        /**
         * When set to a non-empty string, a confirmation message to show to
         * the user. If they click the button and confirm at the prompt,
         * the button's `onClick` function will be called.
         */
        confirmation?: string;
        onClick?(): void;
    }
>(({ primary, ...props }, ref) => (
    <button
        {...props}
        ref={ref as any}
        className={classNames(
            'c-button',
            primary && 'c-button--primary',
            props.className,
        )}
        onClick={e => {
            if (e.button || !props.onClick) return;
            consumeEvent(e);
            if (props.confirmation && !window.confirm(props.confirmation)) {
                return;
            }
            props.onClick();
        }}
    />
));
