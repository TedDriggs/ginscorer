import { ControlledInput, useFieldChangeHandler } from 'controlled-input';
import { forwardRef } from 'react';

import { PlayerNames } from '../../models';
import { Input } from '../Input';
import { Focus } from '../util/Focus';
import './PlayersInput.scss';

export const PlayersInput = forwardRef<Focus, ControlledInput<PlayerNames>>(
    (props, ref) => {
        const handleChange = useFieldChangeHandler(props);

        const { value, disabled } = props;
        return (
            <div className="c-players-input">
                <Input
                    ref={ref}
                    label="Player 1"
                    name="player1Name"
                    value={value.player1Name}
                    disabled={disabled}
                    onChange={handleChange}
                    required
                    maxLength={15}
                />
                <Input
                    label="Player 2"
                    name="player2Name"
                    value={value.player2Name}
                    disabled={disabled}
                    onChange={handleChange}
                    required
                    maxLength={15}
                />
            </div>
        );
    },
);
