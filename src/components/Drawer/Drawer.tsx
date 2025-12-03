import { FC, KeyboardEvent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, Transition } from 'react-transition-group';
import { Key } from 'w3c-keys';

import { consumeEvent } from '../util/Event';
import './Drawer.scss';

const TRANSITION_TIMEOUT_MS = 125;

export const Drawer: FC<{
    open?: boolean;
    onEntered?(): void;
    onExited?(): void;
    /**
     * Event handler called when the user attempts to dismiss the
     * drawer. If no handler is provided, the user cannot dismiss
     * the drawer.
     */
    onDismiss?(): void;
    children?: ReactNode;
}> = props => {
    const drawerElement = useRef<HTMLDivElement>(null);
    const handleKeyDown = (e: KeyboardEvent<unknown>): void => {
        if (e.key === Key.Escape && props.onDismiss) {
            consumeEvent(e);
            props.onDismiss();
        }
    };

    return createPortal(
        <>
            <CSSTransition
                in={props.open}
                timeout={TRANSITION_TIMEOUT_MS}
                classNames="c-drawer__backdrop"
                appear
                mountOnEnter
                unmountOnExit
            >
                <div
                    onClick={e => {
                        // only consider primary clicks
                        if (e.button !== 0) return;
                        props.onDismiss?.();
                    }}
                    className="c-drawer__backdrop"
                />
            </CSSTransition>
            <CSSTransition
                in={props.open}
                classNames="c-drawer"
                timeout={TRANSITION_TIMEOUT_MS}
                onEntered={props.onEntered}
                onExited={props.onExited}
                appear
            >
                <div
                    ref={drawerElement}
                    className="c-drawer"
                    onKeyDown={handleKeyDown}
                    role="dialog"
                >
                    <Transition
                        in={props.open}
                        timeout={TRANSITION_TIMEOUT_MS}
                        appear
                        mountOnEnter
                        unmountOnExit
                    >
                        {props.children}
                    </Transition>
                </div>
            </CSSTransition>
        </>,
        document.body,
    );
};
