import * as React from 'react';

import { Button } from './Button';
import { ConsumableEvent, consumeEvent } from './util/Event';

export interface FormProps {
    className?: string;
    disableSubmit?: boolean;
    submitLabel?: React.ReactNode;
    onSubmit(): void;
}

/**
 * A wrapper for a native form that provides Enter-key submission abilities
 * and semantic correctness.
 */
export class Form extends React.PureComponent<FormProps> {
    public render(): React.ReactNode {
        const { props } = this;

        return (
            <form className={props.className} onSubmit={this.handleSubmit}>
                {props.children}
                {props.submitLabel && (
                    <Button disabled={props.disableSubmit} type="submit">
                        {props.submitLabel}
                    </Button>
                )}
            </form>
        );
    }

    private readonly handleSubmit = (e: ConsumableEvent) => {
        consumeEvent(e);

        if (this.props.disableSubmit) return;

        this.props.onSubmit();
    }
}
