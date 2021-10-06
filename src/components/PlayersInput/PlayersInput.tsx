import React from 'react';

import { ControlledInput, makeFieldChangeHandler } from '../../ControlledInput';
import { PlayerNames } from '../../models';
import { Input } from '../Input';
import { Focus } from '../util/Focus';
import { focusRef } from '../util/Ref';
import './PlayersInput.css';

export class PlayersInput extends React.Component<
    ControlledInput<PlayerNames>
> {
    private readonly handleChange = makeFieldChangeHandler(this);
    private readonly focusTarget = React.createRef<Focus>();

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
                    required
                />
                <Input
                    label="Player 2"
                    name="player2Name"
                    value={value.player2Name}
                    disabled={disabled}
                    onChange={this.handleChange}
                    required
                />
            </div>
        );
    }

    public readonly focus = () => focusRef(this.focusTarget);
}
