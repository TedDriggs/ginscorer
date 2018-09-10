import * as React from 'react';

import { Game, Gin, GinMatch, Player } from '../../models';
import { GameInput, GameInputProps } from '../GameInput';
import { ScoreColumn } from '../ScoreColumn';
import './MatchViewer.css';

export interface MatchViewerProps {
    value: GinMatch;
    readOnly?: boolean;
    onSubmitGame?(game: Game): void;
}

export const MatchViewer: React.SFC<MatchViewerProps> = ({
    value,
    readOnly,
    ...props
}) => (
    <div className="c-match-viewer">
        <div className="c-match-viewer__sets">
            {value.sets.map((s, i) => (
                <ScoreColumn
                    key={i}
                    player1Name={value.player1Name}
                    player2Name={value.player2Name}
                    value={s}
                />
            ))}
        </div>
        {!readOnly && (
            <GameForm
                player1Name={value.player1Name}
                player2Name={value.player2Name}
                onSubmitGame={props.onSubmitGame}
            />
        )}
    </div>
);

class GameForm extends React.Component<
    Pick<MatchViewerProps, 'onSubmitGame'> &
        Pick<GameInputProps, 'player1Name' | 'player2Name'>,
    Game
> {
    constructor(props: Pick<MatchViewerProps, 'onSubmitGame'>) {
        super(props);
        this.state = {
            winner: Player.One,
            points: 0,
            gin: Gin.None,
        };
    }

    public render() {
        return (
            <div className="c-gameform">
                <GameInput
                    player1Name={this.props.player1Name}
                    player2Name={this.props.player2Name}
                    value={this.state}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }

    private readonly handleChange = (value: Game) => {
        this.setState(value);
    };

    private readonly handleSubmit = (evt: React.MouseEvent<any>) => {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.props.onSubmitGame) this.props.onSubmitGame(this.state);
        this.setState({
            winner: Player.One,
            points: 0,
            gin: Gin.None,
        });
    };
}
