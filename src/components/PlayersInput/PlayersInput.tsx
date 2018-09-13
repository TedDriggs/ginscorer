import * as React from 'react';

import { ControlledInput, makeFieldChangeHandler } from '../../ControlledInput';
import { Input } from '../Input';
import { focusRef } from '../util/Ref';

export interface PlayersInputProps
    extends ControlledInput<{ player1Name: string; player2Name: string }> {}

export class PlayersInput extends React.Component<PlayersInputProps> {
    private readonly handleChange = makeFieldChangeHandler(this);
    private readonly focusTarget = React.createRef<Input>();

    public render(): React.ReactNode {
        const { value, disabled } = this.props;
        return (
            <div className="c-players-input">
                <Input
                    ref={this.focusTarget}
                    label="Player 1"
                    name="player1Name"
                    value={value.player1Name}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
                <Input
                    label="Player 2"
                    name="player2Name"
                    value={value.player2Name}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    public readonly focus = () => focusRef(this.focusTarget);
}
