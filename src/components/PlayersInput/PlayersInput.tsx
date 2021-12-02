import { Component, createRef, ReactNode } from 'react';

import { ControlledInput, makeFieldChangeHandler } from '../../ControlledInput';
import { PlayerNames } from '../../models';
import { Input } from '../Input';
import { Focus } from '../util/Focus';
import { focusRef } from '../util/Ref';
import './PlayersInput.scss';

export class PlayersInput extends Component<ControlledInput<PlayerNames>> {
    private readonly handleChange = makeFieldChangeHandler(this);
    private readonly focusTarget = createRef<Focus>();

    public render(): ReactNode {
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
                    maxLength={15}
                />
                <Input
                    label="Player 2"
                    name="player2Name"
                    value={value.player2Name}
                    disabled={disabled}
                    onChange={this.handleChange}
                    required
                    maxLength={15}
                />
            </div>
        );
    }

    public readonly focus = () => focusRef(this.focusTarget);
}
