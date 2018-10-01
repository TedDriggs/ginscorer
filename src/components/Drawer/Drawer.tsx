import * as classNames from 'classnames';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Key } from 'w3c-keys';

import { Button } from '../Button';
import { consumeEvent } from '../util/Event';
import { focusRef } from '../util/Ref';
import './Drawer.css';

const TRANSITION_TIMEOUT_MS = 125;

export interface DrawerProps {
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
}

export class Drawer extends React.Component<DrawerProps> {
    private readonly titleButton = React.createRef<Button>();

    public render(): React.ReactNode {
        const { props } = this;

        return createPortal(
            <>
                <CSSTransition
                    in={props.open}
                    timeout={TRANSITION_TIMEOUT_MS}
                    classNames="c-drawer__backdrop"
                    mountOnEnter
                    unmountOnExit
                >
                    <div
                        onClick={this.handleBackdropClick}
                        className="c-drawer__backdrop"
                    />
                </CSSTransition>
                <CSSTransition
                    in={props.open}
                    classNames="c-drawer"
                    timeout={TRANSITION_TIMEOUT_MS}
                    onExit={this.handleExit}
                    onEntered={props.onEntered}
                    mountOnEnter={!props.title}
                    unmountOnExit={!props.title}
                >
                    <div
                        className={classNames('c-drawer', {
                            'c-drawer--has-title': Boolean(props.title) && !props.hideTitle,
                        })}
                        onKeyDown={this.handleKeyDown}
                        role="dialog"
                    >
                        {props.title && (
                            <Button
                                ref={this.titleButton}
                                className="c-drawer__title"
                                onClick={props.onTitleClick}
                            >
                                <span className="c-drawer__title__text">
                                    {props.title}
                                </span>
                            </Button>
                        )}
                        {props.children}
                    </div>
                </CSSTransition>
            </>,
            document.body,
        );
    }

    private readonly handleBackdropClick = (e: React.MouseEvent<any>) => {
        if (e.button || !this.props.onDismiss) return;
        this.props.onDismiss();
    };

    private readonly handleKeyDown = (e: React.KeyboardEvent<any>) => {
        const { onDismiss } = this.props;

        if (onDismiss && e.key === Key.Escape) {
            consumeEvent(e);
            onDismiss();
        }
    };

    private readonly handleExit = () => {
        focusRef(this.titleButton);
    };
}
