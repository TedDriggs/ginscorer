import * as React from 'react';

import { PlayerNames } from '../models';
import { Button } from './Button';
import { Drawer } from './Drawer';
import { PlayersInput } from './PlayersInput';
import { consumeEvent } from './util/Event';
import { focusRef } from './util/Ref';

export interface PlayersFormProps {
    value: PlayerNames;
    onPlayersSubmit(players: PlayerNames): void;
}

interface PlayersFormState {
    isRenaming: boolean;
    value?: PlayerNames;
}

export class PlayersForm extends React.Component<
    PlayersFormProps,
    PlayersFormState
> {
    private readonly input = React.createRef<PlayersInput>();
    private readonly button = React.createRef<Button>();

    constructor(props: PlayersFormProps) {
        super(props);
        this.state = {
            isRenaming: false,
        };
    }

    public render(): React.ReactNode {
        return (
            <>
                <Button ref={this.button} onClick={this.handleEditButtonClick}>
                    Rename Players
                </Button>
                <Drawer
                    open={this.state.isRenaming}
                    onDismiss={this.stopRenaming}
                >
                    <form onSubmit={this.handleSubmit}>
                        <PlayersInput
                            ref={this.input}
                            value={this.state.value || this.props.value}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Update</button>
                    </form>
                </Drawer>
            </>
        );
    }

    private readonly handleEditButtonClick = () => {
        this.setState({ isRenaming: true });
        focusRef(this.input);
    };

    private readonly handleChange = (value: PlayersFormProps['value']) => {
        this.setState({ value });
    };

    private readonly handleSubmit = (e: React.FormEvent<any>) => {
        consumeEvent(e);
        if (!this.state.value) return;
        this.props.onPlayersSubmit(this.state.value);
        this.stopRenaming();
    };

    private readonly stopRenaming = () => {
        this.setState({ isRenaming: false, value: undefined });
        focusRef(this.button);
    };
}
