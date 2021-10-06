import classNames from 'classnames';
import React from 'react';

import { ControlledInput } from '../../ControlledInput';
import { Focus } from '../util/Focus';
import './Input.css';

export const Input = React.forwardRef<
    Focus,
    ControlledInput<string> & {
        className?: string;
        label?: string;
    } & Pick<
            React.InputHTMLAttributes<HTMLInputElement>,
            'required' | 'maxLength'
        >
>(({ onChange, label, className, ...props }, ref) => (
    <label className={classNames('c-input', className)}>
        {label && <div className="c-input-label">{label}</div>}
        <input
            {...props}
            ref={ref as any}
            onChange={e => onChange(e.target.value, props.name)}
        />
    </label>
));
