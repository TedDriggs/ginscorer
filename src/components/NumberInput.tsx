import classNames from 'classnames';
import React from 'react';

import { ControlledInput } from '../ControlledInput';

export interface NumberInputProps extends ControlledInput<number | null> {
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export class NumberInput extends React.Component<NumberInputProps> {
    public render(): React.ReactNode {
        const { value, className, ...props } = this.props;
        return (
            <input
                {...props}
                className={classNames('c-number-input', className)}
                type="number"
                value={value !== null ? value.toString() : ''}
                onChange={this.handleChange}
            />
        );
    }

    private readonly handleChange = (
        evt: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { value } = evt.target;
        const parsed = value === '' ? null : Number.parseInt(value, 10);
        if (this.props.onChange) {
            this.props.onChange(parsed, this.props.name);
        }
    };
}
