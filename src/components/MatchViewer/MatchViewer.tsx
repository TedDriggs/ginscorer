import * as React from 'react';
import MediaQuery from 'react-responsive';

import * as classNames from 'classnames';
import { Game, Gin, GinMatch, isGame } from '../../models';
import { Drawer } from '../Drawer/Drawer';
import { GameInput, GameInputProps, PartialGame } from '../GameInput';
import { ScoreColumn } from '../ScoreColumn';
import { ScrollViewer } from '../ScrollViewer';
import { SetView } from '../SetView';
import { focusRef } from '../util/Ref';
import { MatchResultViewer } from './MatchResultViewer';
import './MatchViewer.css';

export interface MatchViewerProps {
    value: GinMatch;
    readOnly?: boolean;
    onSubmitGame?(game: Game): void;
    onNewMatch?(): void;
}

const INITIAL_STATE = {
    drawerOpen: false,
};

type State = typeof INITIAL_STATE;

export class MatchViewer extends React.Component<MatchViewerProps, State> {
    private readonly gameForm = React.createRef<GameForm>();

    constructor(props: MatchViewerProps) {
        super(props);

        this.state = INITIAL_STATE;
    }

    public render(): React.ReactNode {
        const { value, readOnly, ...props } = this.props;

        const gameForm = (
            <GameForm
                ref={this.gameForm}
                player1Name={value.player1Name}
                player2Name={value.player2Name}
                onSubmitGame={this.handleGameSubmit}
            />
        );

        return (
            <div
                className={classNames('c-match-viewer', {
                    'c-match-viewer--finished': Boolean(value.finalResult),
                })}
            >
                <MediaQuery minWidth={600}>
                    <ScrollViewer>
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
                    </ScrollViewer>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                    <ScrollViewer overflowX="hidden">
                        {value.sets.map((v, i) => (
                            <SetView
                                key={i}
                                value={v}
                                player1Name={value.player1Name}
                                player2Name={value.player2Name}
                            />
                        ))}
                    </ScrollViewer>
                </MediaQuery>
                {value.finalResult && (
                    <MatchResultViewer
                        player1Name={value.player1Name}
                        player2Name={value.player2Name}
                        {...value.finalResult}
                        onNewMatch={props.onNewMatch}
                    />
                )}
                {!readOnly && (
                    <>
                        <MediaQuery maxWidth={600}>
                            <Drawer
                                open={this.state.drawerOpen}
                                title="Add game"
                                onTitleClick={this.handleGameFormOpen}
                                onDismiss={this.closeGameForm}
                                hideTitle={!!value.finalResult}
                            >
                                {gameForm}
                            </Drawer>
                        </MediaQuery>
                        <MediaQuery minWidth={600}>
                            <div className="c-match-viewer__add-game">
                                <h1>Add game</h1>
                                {gameForm}
                            </div>
                        </MediaQuery>
                    </>
                )}
            </div>
        );
    }

    private readonly handleGameSubmit: MatchViewerProps['onSubmitGame'] = game => {
        if (this.props.onSubmitGame) this.props.onSubmitGame(game);
        this.closeGameForm();
    };

    private readonly closeGameForm = () => {
        this.setState({ drawerOpen: false });
    };

    private readonly handleGameFormOpen = () => {
        this.setState({ drawerOpen: true });
        focusRef(this.gameForm);
    };
}

type GameFormProps = Pick<MatchViewerProps, 'onSubmitGame'> &
    Pick<GameInputProps, 'player1Name' | 'player2Name' | 'disabled'>;

class GameForm extends React.Component<GameFormProps, PartialGame> {
    private readonly input = React.createRef<GameInput>();

    constructor(props: GameFormProps) {
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
                    disabled={this.props.disabled}
                    value={this.state}
                    onChange={this.handleChange}
                />
                <button
                    type="submit"
                    disabled={this.props.disabled || !isGame(this.state)}
                >
                    Submit
                </button>
            </form>
        );
    }

    public readonly focus = () => focusRef(this.input);

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

        this.focus();
    };
}
