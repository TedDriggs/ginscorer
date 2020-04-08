import React from 'react';

import { ControlledInput, makeFieldChangeHandler } from '../../ControlledInput';
import { Game, Gin, Player } from '../../models';
import { NumberInput } from '../NumberInput';
import { RadioGroup } from '../RadioGroup';
import { focusRef } from '../util/Ref';
import './GameInput.css';

/**
 * A variant of the `Game` interface optimized for input.
 */
export interface PartialGame {
    winner: Game['winner'];
    points: number | null;
    gin: Game['gin'];
}

const DEFAULT_PARTIAL_GAME: PartialGame = {
    winner: Player.One,
    points: null,
    gin: Gin.None,
};

export const PartialGame = {
    DEFAULT: DEFAULT_PARTIAL_GAME,
};

export interface GameInputProps extends ControlledInput<PartialGame> {
    player1Name: string;
    player2Name: string;
}

export class GameInput extends React.Component<GameInputProps> {
    private readonly focusTarget = React.createRef<RadioGroup<any>>();
    private readonly handleChange = makeFieldChangeHandler(this);

    public render(): React.ReactNode {
        const { value, disabled, ...props } = this.props;

        return (
            <div className="c-game-input">
                <RadioGroup<Player>
                    name="winner"
                    className="c-game-input__players"
                    choices={[
                        { value: Player.One, label: props.player1Name },
                        { value: Player.Two, label: props.player2Name },
                    ]}
                    value={value.winner}
                    disabled={disabled}
                    label="Winner"
                    onChange={this.handleChange}
                    hideNative
                    horizontal
                    ref={this.focusTarget}
                />
                <div className="c-game-input__points">
                    <NumberInput
                        name="points"
                        value={value.points}
                        min={1}
                        disabled={disabled}
                        onChange={this.handleChange}
                    />
                    &nbsp; points
                </div>
                <RadioGroup<Gin>
                    name="gin"
                    value={value.gin}
                    className="c-game-input__gin"
                    choices={[
                        { value: Gin.None, label: 'No Gin' },
                        { value: Gin.Normal, label: 'Gin' },
                        { value: Gin.Super, label: 'Super Gin' },
                    ]}
                    disabled={disabled}
                    onChange={this.handleChange}
                    horizontal
                    hideNative
                />
            </div>
        );
    }

    public readonly focus = () => focusRef(this.focusTarget);
}
