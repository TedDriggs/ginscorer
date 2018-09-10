import * as React from 'react';

export interface InputProps {
    value: string;
    disabled?: boolean;
    name?: string;
    onChange(newValue: string, name?: string): void;
}

export class Input extends React.Component<InputProps> {
    public render(): React.ReactNode {
        return <input {...this.props} onChange={this.handleChange} />;
    }

    private readonly handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        this.props.onChange(e.target.value, this.props.name);
    };
}
