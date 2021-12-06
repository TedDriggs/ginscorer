import classNames from 'classnames';
import { ControlledInput } from 'controlled-input';
import { forwardRef, InputHTMLAttributes } from 'react';

import { Focus } from '../util/Focus';
import { BaseInput } from './Base';
import './Input.scss';

export const Input = forwardRef<
    Focus,
    ControlledInput<string> & {
        className?: string;
        label?: string;
    } & Pick<InputHTMLAttributes<HTMLInputElement>, 'required' | 'maxLength'>
>(({ onChange, label, className, ...props }, ref) => (
    <label className={classNames('c-input', className)}>
        {label && <div className="c-input-label">{label}</div>}
        <BaseInput
            {...props}
            ref={ref as any}
            onChange={e => onChange?.(e.target.value, props.name)}
        />
    </label>
));
