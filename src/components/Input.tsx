import * as React from 'react';
import { focusRef, refChildHasFocus } from './util/Ref';

export interface InputProps {
    value: string;
    disabled?: boolean;
    name?: string;
    label?: string;
    onChange(newValue: string, name?: string): void;
}

export class Input extends React.Component<InputProps> {
    private readonly root = React.createRef<HTMLInputElement>();

    // tslint:disable-next-line:member-ordering
    public readonly hasFocus = refChildHasFocus(this.root);

    public render(): React.ReactNode {
        const { label, ...props } = this.props;
        return (
            <label>
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
