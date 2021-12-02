import classNames from 'classnames';
import {
    FC,
    KeyboardEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, Transition } from 'react-transition-group';
import { Key } from 'w3c-keys';

import { consumeEvent } from '../util/Event';
import { focusRef } from '../util/Ref';
import './Drawer.scss';

const TRANSITION_TIMEOUT_MS = 125;

export const Drawer: FC<{
    open?: boolean;
    hideTitle?: boolean;
    title?: string;
    onTitleClick?(): void;
    onEntered?(): void;
    onExited?(): void;
    /**
     * Event handler called when the user attempts to dismiss the
     * drawer. If no handler is provided, the user cannot dismiss
     * the drawer.
     */
    onDismiss?(): void;
}> = props => {
    const drawerElement = useRef<HTMLDivElement>(null);
    const titleButton = useRef<HTMLButtonElement>(null);
    const handleKeyDown = (e: KeyboardEvent<unknown>): void => {
        if (e.key === Key.Escape && props.onDismiss) {
            consumeEvent(e);
            props.onDismiss();
        }
    };
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        if (props.hideTitle || !props.title) return;
        const handler = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [props.title, props.hideTitle]);

    // Safari's address bar interacts frustratingly with the 100vh measurement
    // used to anchor the drawer to the bottom of the screen. To avoid drawer
    // buttons being drawn inaccessibly out of view, push the button in the
    // closed state up by the amount it's out of frame.
    useLayoutEffect(() => {
        if (!titleButton.current) return;
        // There's no address bar in standalone mode
        if ('standalone' in navigator && (navigator as any).standalone) return;
        const { bottom } = titleButton.current.getBoundingClientRect();
        const bottomFix = Math.max(0, bottom - windowHeight);
        drawerElement.current?.style.setProperty(
            '--safari-correction',
            `${bottomFix}px`,
        );
    }, [windowHeight]);

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
                onExited={props.onExited}
                appear
            >
                <div
                    ref={drawerElement}
                    className={classNames('c-drawer', {
                        'c-drawer--has-title':
                            Boolean(props.title) && !props.hideTitle,
                    })}
                    onKeyDown={handleKeyDown}
                    role="dialog"
                >
                    {props.title && (
                        <button
                            ref={titleButton}
                            className="c-drawer__title"
                            onClick={e => {
                                consumeEvent(e);
                                props.onTitleClick?.();
                            }}
                        >
                            <span className="c-drawer__title__text">
                                {props.title}
                            </span>
                        </button>
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
