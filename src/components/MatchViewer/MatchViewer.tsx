import classNames from 'classnames';
import React, { FC, useMemo, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';

import { reduceGamesToStats } from 'src/models/stats';
import { Game, GinMatch } from '../../models';
import { Drawer, DrawerTitleSpacer } from '../Drawer/Drawer';
import { Form } from '../Form';
import { GameInput, GameInputProps, PartialGame } from '../GameInput';
import { ScoreColumn } from '../ScoreColumn';
import { ScrollViewer } from '../ScrollViewer';
import { SetView } from '../SetView';
import { StatsViewer } from '../StatsViewer';
import { focusRef } from '../util/Ref';
import { MatchResultViewer } from './MatchResultViewer';
import './MatchViewer.css';

export interface MatchViewerProps {
    value: GinMatch;
    readOnly?: boolean;
    onSubmitGame?(game: Game): void;
    onNewMatch?(): void;
}

export const MatchViewer: FC<MatchViewerProps> = ({
    value: { player1Name, player2Name, ...value },
    readOnly,
    ...props
}) => {
    const gameFormRef = useRef<GameForm>(null);
    const stats = useMemo(() => reduceGamesToStats(value.games), [value.games]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const players = { player1Name, player2Name };

    const closeGameForm = (): void => {
        setDrawerOpen(false);
    };

    const gameForm = (
        <GameForm
            ref={gameFormRef}
            {...players}
            onSubmitGame={game => {
                props.onSubmitGame?.(game);
                closeGameForm();
            }}
        />
    );

    return (
        <div
            className={classNames('c-match-viewer', {
                'c-match-viewer--finished': Boolean(value.finalResult),
            })}
        >
            <MediaQuery minWidth={600}>
                <ScrollViewer className="c-match-viewer__main">
                    <div className="c-match-viewer__sets">
                        {value.sets.map((s, i) => (
                            <ScoreColumn key={i} {...players} value={s} />
                        ))}
                    </div>
                    <StatsViewer value={stats} layout="stack" />
                </ScrollViewer>
            </MediaQuery>
            <MediaQuery maxWidth={600}>
                <ScrollViewer overflowX="hidden">
                    {value.sets.map((v, i) => (
                        <SetView key={i} value={v} {...players} />
                    ))}
                    <StatsViewer value={stats} layout="grid" />
                </ScrollViewer>
            </MediaQuery>
            {value.finalResult && (
                <MatchResultViewer
                    {...players}
                    {...value.finalResult}
                    onNewMatch={props.onNewMatch}
                />
            )}
            {!readOnly && (
                <>
                    <MediaQuery maxWidth={1000}>
                        <DrawerTitleSpacer />
                        <Drawer
                            open={drawerOpen}
                            title="Add game"
                            onTitleClick={() => {
                                setDrawerOpen(true);
                                gameFormRef.current?.focus();
                            }}
                            onDismiss={closeGameForm}
                            hideTitle={!!value.finalResult}
                        >
                            {gameForm}
                        </Drawer>
                    </MediaQuery>
                    <MediaQuery minWidth={1000}>
                        <div className="c-match-viewer__add-game">
                            <h1>Add game</h1>
                            {gameForm}
                        </div>
                    </MediaQuery>
                </>
            )}
        </div>
    );
};

type GameFormProps = Pick<MatchViewerProps, 'onSubmitGame'> &
    Pick<GameInputProps, 'player1Name' | 'player2Name' | 'disabled'>;

class GameForm extends React.Component<GameFormProps, PartialGame> {
    private readonly input = React.createRef<GameInput>();

    constructor(props: GameFormProps) {
        super(props);
        this.state = PartialGame.DEFAULT;
    }

    public render() {
        return (
            <Form
                className="c-gameform"
                onSubmit={this.handleSubmit}
                disableSubmit={this.props.disabled || !Game.guard(this.state)}
                submitLabel="Submit"
            >
                <GameInput
                    ref={this.input}
                    player1Name={this.props.player1Name}
                    player2Name={this.props.player2Name}
                    disabled={this.props.disabled}
                    value={this.state}
                    onChange={this.handleChange}
                />
            </Form>
        );
    }

    public readonly focus = () => focusRef(this.input);

    private readonly handleChange = (value: PartialGame) => {
        this.setState(value);
    };

    private readonly handleSubmit = () => {
        // Don't allow submission of incomplete games
        // TODO show an error in this case
        if (!Game.guard(this.state)) return;

        if (this.props.onSubmitGame) this.props.onSubmitGame(this.state);

        // Wipe the state, so we're ready for the next game input.
        this.setState(PartialGame.DEFAULT);

        this.focus();
    };
}
