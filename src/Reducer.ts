import { Cmd, Loop, loop, LoopReducer } from 'redux-loop';
import { Action } from './Actions';
import { persistState } from './Effects';
import { Game, nameOfPlayer, otherPlayer, Player } from './models';
import { State } from './State';

export const gameSelector = (state: State): Game[] => state.games;

export const playerNameSelector = ({
    player1Name,
    player2Name,
}: State): Pick<State, 'player1Name' | 'player2Name'> => ({
    player1Name,
    player2Name,
});

export const canUndoSelector = ({ games }: State): boolean =>
    Boolean(games.length);

export const dealerSelector = ({ games, initialDealer }: State): Player =>
    games.length % 2 === 0 ? initialDealer : otherPlayer(initialDealer);

export const dealerNameSelector = (state: State): string =>
    nameOfPlayer(state, dealerSelector(state));

export const matchHasStartedSelector = (state: State): boolean =>
    Boolean(state.games.length);

export const reducer: LoopReducer<State, Action> = (
    state: State,
    action: Action,
) => {
    switch (action.type) {
        case 'RenamePlayers': {
            const { player1Name, player2Name } = action;
            return persisted({
                ...state,
                player1Name,
                player2Name,
            });
        }
        case 'FinishGame': {
            return persisted({
                ...state,
                games: [...state.games, action.result],
            });
        }
        case 'UndoGame': {
            return persisted({
                ...state,
                games: state.games.slice(0, state.games.length - 1),
            });
        }
        case 'StartNewMatch': {
            return persisted({
                ...state,
                games: [],
            });
        }
        case 'SetInitialDealer': {
            // If the match is in progress, don't allow the initial dealer to
            // change.
            if (state.games.length) return state;

            return persisted({
                ...state,
                initialDealer: action.dealer,
            });
        }
        default: {
            return state;
        }
    }
};

const persisted = (state: State): Loop<State> =>
    loop(
        state,
        Cmd.run(persistState, {
            args: [state],
        }),
    );
