import * as classNames from 'classnames';
import * as React from 'react';

import { ControlledInput } from '../../ControlledInput';
import { focusRef, refChildHasFocus } from '../util/Ref';
import './Input.css';

export interface InputProps extends ControlledInput<string> {
    className?: string;
    label?: string;
}

export class Input extends React.Component<InputProps> {
    private readonly root = React.createRef<HTMLInputElement>();

    // tslint:disable-next-line:member-ordering
    public readonly hasFocus = refChildHasFocus(this.root);

    public render(): React.ReactNode {
        const { label, className, ...props } = this.props;
        return (
            <label className={classNames('c-input', className)}>
                {label && <div className="c-input-label">{label}</div>}
                <input
                    {...props}
                    ref={this.root}
                    onChange={this.handleChange}
                />
            </label>
        );
    }

    public readonly focus = () => focusRef(this.root);

    private readonly handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        this.props.onChange(e.target.value, this.props.name);
    };
}
