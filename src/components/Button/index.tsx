import * as classNames from 'classnames';
import * as React from 'react';

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?(): void;
}

export class Button extends React.Component<ButtonProps> {
    public render(): React.ReactNode {
        const { className, disabled, onClick, children, ...props } = this.props;

        return (
            <button
                {...props}
                className={classNames('c-button', className)}
                disabled={disabled}
                onClick={this.handleClick}
            >
                {children}
            </button>
        );
    }

    private readonly handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        // Ignore non-primary mouse buttons or uses dependent on the native button
        if (e.button || !this.props.onClick) return;

        e.stopPropagation();
        e.preventDefault();

        this.props.onClick();
    }
}
