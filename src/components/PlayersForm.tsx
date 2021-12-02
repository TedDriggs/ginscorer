import { FC, useRef, useState } from 'react';

import { PlayerNames } from '../models';
import { Button, ButtonRef } from './Button';
import { Drawer } from './Drawer';
import { Form } from './Form';
import { PlayersInput } from './PlayersInput';
import { Focus } from './util/Focus';

export interface PlayersFormProps {
    value: PlayerNames;
    onPlayersSubmit(players: PlayerNames): void;
}

export const PlayersForm: FC<{
    /**
     * The currently-committed player names. Updates to this property while
     * the renaming form is shown will not take effect until the form is
     * closed, and may be superseded by a form submission.
     */
    defaultValue: PlayerNames;
    onSubmit(names: PlayerNames): void;
}> = props => {
    // The draft values for player names. The presence of a draft means the
    // form is currently open; if this is `null` the form is not visible.
    const [value, setValue] = useState<PlayerNames | null>(null);
    const button = useRef<ButtonRef>(null);
    const input = useRef<Focus>(null);

    const stopRenaming = () => setValue(null);

    return (
        <>
            <Button ref={button} onClick={() => setValue(props.defaultValue)}>
                Rename Players
            </Button>
            <Drawer
                hideTitle
                title="Rename Players"
                open={value !== null}
                onDismiss={stopRenaming}
                onEntered={() => input.current?.focus()}
                onExited={() => button.current?.focus()}
            >
                <Form
                    style={{
                        marginLeft: 10,
                        marginRight: 10,
                        maxWidth: '30em',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    onSubmit={() => {
                        if (!value) return;
                        props.onSubmit(value);
                        stopRenaming();
                    }}
                >
                    <PlayersInput
                        ref={input}
                        value={value ?? props.defaultValue}
                        onChange={v => setValue(v)}
                    />
                    <div style={{ height: 20 }} />
                    <Button primary type="submit">
                        Update
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};
