import { FC, useRef, useState } from 'react';

import { PlayerNames } from '../models';
import { Button, ButtonRef } from './Button';
import { Drawer } from './Drawer';
import { Form } from './Form';
import { PlayersInput } from './PlayersInput';

export interface PlayersFormProps {
    value: PlayerNames;
    onPlayersSubmit(players: PlayerNames): void;
}

export const PlayersForm: FC<{
    defaultValue: PlayerNames;
    onSubmit(names: PlayerNames): void;
}> = props => {
    const [isRenaming, setRenaming] = useState(false);
    const [value, setValue] = useState<PlayerNames | undefined>(undefined);
    const button = useRef<ButtonRef>(null);
    const input = useRef<PlayersInput>(null);

    const stopRenaming = () => {
        setRenaming(false);
        setValue(undefined);
        button.current?.focus();
    };

    return (
        <>
            <Button ref={button} onClick={() => setRenaming(true)}>
                Rename Players
            </Button>
            <Drawer
                title={isRenaming ? 'Rename Players' : undefined}
                open={isRenaming}
                onDismiss={stopRenaming}
                onEntered={() => input.current?.focus()}
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
