import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

import './Input.scss';

export const BaseInput = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
    <input
        ref={ref}
        {...props}
        className={classNames('c-base-input', props.className)}
    />
));
