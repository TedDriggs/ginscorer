import { FC } from 'react';

import { Button } from './Button';
import { consumeEvent } from './util/Event';

/**
 * A wrapper for a native form that provides Enter-key submission abilities
 * and semantic correctness.
 */
export const Form: FC<{
    className?: string;
    style?: React.CSSProperties;
    disableSubmit?: boolean;
    submitLabel?: React.ReactNode;
    onSubmit(): void;
}> = props => (
    <form
        style={props.style}
        className={props.className}
        onSubmit={e => {
            consumeEvent(e);
            if (props.disableSubmit) return;
            props.onSubmit();
        }}
    >
        {props.children}
        {props.submitLabel && (
            <Button primary disabled={props.disableSubmit} type="submit">
                {props.submitLabel}
            </Button>
        )}
    </form>
);
