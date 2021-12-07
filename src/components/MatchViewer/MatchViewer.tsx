import classNames from 'classnames';
import {
    FC,
    forwardRef,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import MediaQuery from 'react-responsive';

import { reduceGamesToStats } from '../../models/stats';
import { Game, GinMatch, PlayerNames } from '../../models';
import { Drawer, DrawerTitleSpacer } from '../Drawer/Drawer';
import { Form } from '../Form';
import { GameInput, GameInputProps, PartialGame } from '../GameInput';
import { ScoreColumn } from '../ScoreColumn';
import { ScrollViewer } from '../ScrollViewer';
import { SetView } from '../SetView';
import { StatsViewer } from '../StatsViewer';
import { Focus } from '../util/Focus';
import { MatchResultViewer } from './MatchResultViewer';
import './MatchViewer.scss';

export interface MatchViewerProps {
    players: PlayerNames;
    value: GinMatch;
    readOnly?: boolean;
    onSubmitGame?(game: Game): void;
    onNewMatch?(): void;
}

export const MatchViewer: FC<MatchViewerProps> = ({
    players,
    value,
    readOnly,
    ...props
}) => {
    const gameFormRef = useRef<Focus>(null);
    const stats = useMemo(() => reduceGamesToStats(value.games), [value.games]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const closeGameForm = (): void => {
        setDrawerOpen(false);
    };

    const gameForm = (
        <GameForm
            ref={gameFormRef}
            {...players}
            disabled={Boolean(value.finalResult)}
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
                    <StatsViewer
                        layout="stack"
                        value={stats}
                        showDealer={!value.finalResult}
                    />
                </ScrollViewer>
            </MediaQuery>
            <MediaQuery maxWidth={600}>
                <ScrollViewer overflowX="hidden">
                    {value.sets.map((v, i) => (
                        <SetView key={i} value={v} {...players} />
                    ))}
                    <StatsViewer
                        layout="grid"
                        value={stats}
                        showDealer={!value.finalResult}
                    />
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
                            onTitleClick={() => setDrawerOpen(true)}
                            onEntered={() => gameFormRef.current?.focus()}
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

const GameForm = forwardRef<Focus, GameFormProps>((props, ref) => {
    const input = useRef<Focus>(null);
    const [draft, setDraft] = useState(PartialGame.DEFAULT);

    useImperativeHandle(
        ref,
        () => ({
            focus: () => input.current?.focus(),
        }),
        [],
    );

    return (
        <Form
            className="c-gameform"
            onSubmit={(): void => {
                // Don't allow submission of incomplete games
                // TODO show an error in this case
                if (!Game.guard(draft)) return;

                props.onSubmitGame?.(draft);

                // Wipe the state, so we're ready for the next game input.
                setDraft(PartialGame.DEFAULT);

                // Move focus back to the top of the form after game entry so that,
                // if the input form is persistently visible, we're prepared for the
                // next game.
                input.current?.focus();
            }}
            disableSubmit={props.disabled || !Game.guard(draft)}
            submitLabel="Submit"
        >
            <GameInput
                ref={input}
                player1Name={props.player1Name}
                player2Name={props.player2Name}
                disabled={props.disabled}
                value={draft}
                onChange={v => setDraft(v)}
            />
        </Form>
    );
});
