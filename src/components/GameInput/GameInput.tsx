import * as React from 'react';

import { makeFieldChangeHandler } from '../../ControlledInput';
import { Game, Gin, Player } from '../../models';
import { NumberInput } from '../NumberInput';
import { Radio } from '../Radio';
import './GameInput.css';

export interface GameInputProps {
    player1Name?: string;
    player2Name?: string;
    value: Game;
    disabled?: boolean;
    name?: string;
    onChange(newValue: Game, name?: string): void;
}

export class GameInput extends React.Component<GameInputProps> {
    private readonly handleChange = makeFieldChangeHandler(this);
    public render(): React.ReactNode {
        const { value, disabled, ...props } = this.props;

        return (
            <div className="c-game-input">
                <div className="c-game-input__players">
                    <Radio<Player>
                        name="winner"
                        selected={value.winner === Player.One}
                        value={Player.One}
                        disabled={disabled}
                        onChange={this.handleChange}
                        label={props.player1Name || 'Player 1'}
                        hideNative
                    />
                    <Radio<Player>
                        name="winner"
                        selected={value.winner === Player.Two}
                        value={Player.Two}
                        disabled={disabled}
                        onChange={this.handleChange}
                        label={props.player2Name || 'Player 2'}
                        hideNative
                    />
                </div>
                <NumberInput
                    name="points"
                    value={value.points}
                    min={1}
                    disabled={disabled}
                    onChange={this.handleChange as any}
                />
                <div className="c-game-input__gin">
                    <Radio<Gin>
                        name="gin"
                        selected={value.gin === Gin.None}
                        value={Gin.None}
                        disabled={disabled}
                        onChange={this.handleChange}
                        label="No Gin"
                    />
                    <Radio<Gin>
                        name="gin"
                        selected={value.gin === Gin.Normal}
                        value={Gin.Normal}
                        disabled={disabled}
                        onChange={this.handleChange}
                        label="Gin"
                    />
                    <Radio<Gin>
                        name="gin"
                        selected={value.gin === Gin.Super}
                        value={Gin.Super}
                        disabled={disabled}
                        onChange={this.handleChange}
                        label="Super Gin"
                    />
                </div>
            </div>
        );
    }
}
