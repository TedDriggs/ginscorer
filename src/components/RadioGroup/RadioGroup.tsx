import classNames from 'classnames';
import React from 'react';

import { ControlledInput } from '../../ControlledInput';
import { Radio } from '../Radio';
import { focusRef } from '../util/Ref';
import './RadioGroup.css';

export interface Choice<T extends string | number = string> {
    label: string;
    value: T;
}

export interface RadioGroupProps<T extends string | number = string>
    extends ControlledInput<T> {
    className?: string;
    label?: string;
    choices: Choice<T>[];
    name: string;
    hideNative?: boolean;
    horizontal?: boolean;
}

/** A set of radio buttons */
export class RadioGroup<
    T extends string | number = string
> extends React.Component<RadioGroupProps<T>> {
    private readonly first = React.createRef<Radio<T>>();

    public render(): React.ReactNode {
        const { className, name, ...props } = this.props;
        return (
            <div
                className={classNames('c-radio-group', className, {
                    'c-radio-group--horizontal': props.horizontal,
                    'c-radio-group--hide-native': props.hideNative,
                })}
            >
                {props.label && (
                    <span className="c-radio-group__label">{props.label}</span>
                )}
                {props.choices.map((choice, idx) => (
                    <Radio<T>
                        {...choice}
                        key={choice.value}
                        ref={idx === 0 ? this.first : undefined}
                        name={name}
                        disabled={props.disabled}
                        hideNative={props.hideNative}
                        selected={props.value === choice.value}
                        onChange={props.onChange}
                    />
                ))}
            </div>
        );
    }

    public focus = () => focusRef(this.first);
}
