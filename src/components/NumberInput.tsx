import classNames from 'classnames';
import React, { FC } from 'react';

import { ControlledInput } from '../ControlledInput';

export interface NumberInputProps extends ControlledInput<number | null> {
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export const NumberInput: FC<NumberInputProps> = props => {
    const { value, className, ...rest } = props;
    return (
        <input
            {...rest}
            className={classNames('c-number-input', className)}
            type="number"
            value={value !== null ? value.toString() : ''}
            onChange={evt => {
                props.onChange(parseInputToInt(evt.target.value), props.name);
            }}
        />
    );
};

const parseInputToInt = (text: string): number | null =>
    text === '' ? null : Number.parseInt(text, 10);
