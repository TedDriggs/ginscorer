import classNames from 'classnames';
import React from 'react';

import { consumeEvent } from '../util/Event';

export const Button = React.forwardRef<
    { focus(): void },
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
        onClick?(): void;
    }
>((props, ref) => (
    <button
        {...props}
        ref={ref as any}
        className={classNames('c-button', props.className)}
        onClick={e => {
            if (e.button || !props.onClick) return;
            consumeEvent(e);
            props.onClick();
        }}
    />
));
