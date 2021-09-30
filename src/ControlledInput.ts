import { Component } from 'react';

export type ChangeHandler<T> = (newVal: T, name?: string) => void;

export interface ControlledInput<T> {
    value: T;
    disabled?: boolean;
    name?: string;
    onChange: ChangeHandler<T>;
}

export const makeFieldChangeHandler =
    <T extends {}>(c: Component<ControlledInput<T>>) =>
    (newVal: T[keyof T], fieldName: keyof T): void => {
        const { value, onChange, disabled, name } = c.props;

        if (disabled) return;

        if (onChange) {
            onChange(
                {
                    ...(value as any),
                    [fieldName]: newVal,
                },
                name,
            );
        }
    };
