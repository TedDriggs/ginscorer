import * as classNames from 'classnames';
import * as React from 'react';

import { focusRef, refChildHasFocus } from '../util/Ref';
import './Radio.css';

export interface RadioProps<T extends string | number = string> {
    className?: string;
    label?: string;
    selected: boolean;
    value: T;
    disabled?: boolean;
    name?: string;
    /**
     * When `true`, the native radio element will be rendered as 0x0 to avoid
     * showing. The caller should then use classes to style the component as-desired.
     */
    hideNative?: boolean;
    onChange(newValue: T, name?: string): void;
}

export class Radio<T extends string | number = string> extends React.Component<
    RadioProps<T>
> {
    private readonly root = React.createRef<HTMLLabelElement>();

    // tslint:disable-next-line:member-ordering
    public readonly hasFocus = refChildHasFocus(this.root);

    public render(): React.ReactNode {
        const { className, children, value, label, ...props } = this.props;

        return (
            <label
                ref={this.root}
                className={classNames('c-radio', className, {
                    'c-radio--checked': props.selected,
                    'c-radio--disabled': props.disabled,
                    'c-radio--nonative': props.hideNative,
                    'c-radio--has-focus': this.hasFocus(),
                })}
            >
                <input
                    name={props.name}
                    disabled={props.disabled}
                    checked={props.selected}
                    onChange={this.handleChange}
                    value={value.toString()}
                    type="radio"
                    onFocus={this.handleFocusChange}
                    onBlur={this.handleFocusChange}
                />
                {label}
            </label>
        );
    }

    public readonly focus = () => focusRef(this.root);

    private readonly handleFocusChange = () => this.forceUpdate();

    private readonly handleChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.props.value, this.props.name);
        }
    };
}
