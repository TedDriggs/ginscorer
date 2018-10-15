import * as classNames from 'classnames';
import * as React from 'react';

import { consumeEvent } from '../util/Event';
import { focusRef } from '../util/Ref';

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    type?: string;
    onClick?(): void;
}

export class Button extends React.Component<ButtonProps> {
    private readonly ref = React.createRef<HTMLButtonElement>();

    public render(): React.ReactNode {
        const { className, disabled, onClick, children, ...props } = this.props;

        return (
            <button
                {...props}
                ref={this.ref}
                className={classNames('c-button', className)}
                disabled={disabled}
                onClick={this.handleClick}
            >
                {children}
            </button>
        );
    }

    public readonly focus = () => focusRef(this.ref);

    private readonly handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        // Ignore non-primary mouse buttons or uses dependent on the native button
        if (e.button || !this.props.onClick) return;

        consumeEvent(e);

        this.props.onClick();
    }
}
