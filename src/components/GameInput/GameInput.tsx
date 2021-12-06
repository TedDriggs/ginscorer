import { ControlledInput, useFieldChangeHandler } from 'controlled-input';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Game, Gin, Player } from '../../models';
import { NumberInput } from '../Input';
import { RadioGroup } from '../RadioGroup';
import { Focus } from '../util/Focus';
import './GameInput.scss';

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

export const GameInput = forwardRef<Focus, GameInputProps>((props, ref) => {
    const focusTarget = useRef<RadioGroup<Player>>(null);
    const handleChange = useFieldChangeHandler(props);
    const { value, disabled } = props;

    useImperativeHandle(ref, () => ({
        focus: () => focusTarget.current?.focus(),
    }));

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
                onChange={handleChange}
                hideNative
                horizontal
                ref={focusTarget}
            />
            <div className="c-game-input__points">
                <NumberInput
                    name="points"
                    value={value.points}
                    min={Game.VALID_POINTS.min}
                    max={Game.VALID_POINTS.max}
                    disabled={disabled}
                    onChange={handleChange}
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
                onChange={handleChange}
                horizontal
                hideNative
            />
        </div>
    );
});
