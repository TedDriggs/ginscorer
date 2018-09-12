import * as React from 'react';

import { Game, Gin, GinMatch, isGame } from '../../models';
import { GameInput, GameInputProps, PartialGame } from '../GameInput';
import { ScoreColumn } from '../ScoreColumn';
import { focusRef } from '../util/Ref';
import { MatchResultViewer } from './MatchResultViewer';
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
        {value.finalResult && (
            <MatchResultViewer
                player1Name={value.player1Name}
                player2Name={value.player2Name}
                {...value.finalResult}
            />
        )}
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
    PartialGame
> {
    private readonly input = React.createRef<GameInput>();

    constructor(props: Pick<MatchViewerProps, 'onSubmitGame'>) {
        super(props);
        this.state = {
            winner: null,
            points: null,
            gin: Gin.None,
        };
    }

    public render() {
        return (
            <form className="c-gameform" onSubmit={this.handleSubmit}>
                <GameInput
                    ref={this.input}
                    player1Name={this.props.player1Name}
                    player2Name={this.props.player2Name}
                    value={this.state}
                    onChange={this.handleChange}
                />
                <button type="submit" disabled={!isGame(this.state)}>
                    Submit
                </button>
            </form>
        );
    }

    private readonly handleChange = (value: PartialGame) => {
        this.setState(value);
    };

    private readonly handleSubmit = (evt: React.MouseEvent<any>) => {
        evt.stopPropagation();
        evt.preventDefault();

        // Don't allow submission of incomplete games
        // TODO show an error in this case
        if (!isGame(this.state)) return;

        if (this.props.onSubmitGame) this.props.onSubmitGame(this.state);

        // Wipe the state, so we're ready for the next game input.
        this.setState({
            winner: null,
            points: null,
            gin: Gin.None,
        });

        focusRef(this.input);
    };
}
