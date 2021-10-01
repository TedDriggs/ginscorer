import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, Transition } from 'react-transition-group';
import { Key } from 'w3c-keys';

import { Button } from '../Button';
import { consumeEvent } from '../util/Event';
import { Focus } from '../util/Focus';
import { focusRef } from '../util/Ref';
import './Drawer.css';

const TRANSITION_TIMEOUT_MS = 125;

export const Drawer: FC<{
    open?: boolean;
    hideTitle?: boolean;
    title?: string;
    onTitleClick?(): void;
    onEntered?(): void;
    /**
     * Event handler called when the user attempts to dismiss the
     * drawer. If no handler is provided, the user cannot dismiss
     * the drawer.
     */
    onDismiss?(): void;
}> = props => {
    const titleButton = useRef<Focus>(null);
    const handleKeyDown = (e: React.KeyboardEvent<unknown>): void => {
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
                onExit={() => focusRef(titleButton)}
                onEntered={props.onEntered}
                appear
            >
                <div
                    className={classNames('c-drawer', {
                        'c-drawer--has-title':
                            Boolean(props.title) && !props.hideTitle,
                    })}
                    onKeyDown={handleKeyDown}
                    role="dialog"
                >
                    {props.title && (
                        <Button
                            ref={titleButton}
                            className="c-drawer__title"
                            onClick={props.onTitleClick}
                        >
                            <span className="c-drawer__title__text">
                                {props.title}
                            </span>
                        </Button>
                    )}
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

/**
 * Placeholder element which can be used to make sure scrolling content isn't
 * hidden by the drawer title.
 */
export const DrawerTitleSpacer: FC = () => (
    <div className="c-drawer-title-placeholder" />
);
