import React, { FC, useRef, useState } from 'react';

import { PlayerNames } from '../models';
import { Button } from './Button';
import { Drawer } from './Drawer';
import { Form } from './Form';
import { PlayersInput } from './PlayersInput';
import { Focus } from './util/Focus';

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
    const button = useRef<Focus>(null);
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
                open={isRenaming}
                onDismiss={stopRenaming}
                onEntered={() => input.current?.focus()}
            >
                <Form
                    onSubmit={() => {
                        if (!value) return;
                        props.onSubmit(value);
                        stopRenaming();
                    }}
                    submitLabel="Update"
                >
                    <PlayersInput
                        ref={input}
                        value={value ?? props.defaultValue}
                        onChange={v => setValue(v)}
                    />
                </Form>
            </Drawer>
        </>
    );
};
