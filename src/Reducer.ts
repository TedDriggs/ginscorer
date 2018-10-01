import { Cmd, Loop, loop, LoopReducer } from 'redux-loop';
import { Action } from './Actions';
import { persistState } from './Effects';
import { Game } from './models';
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
        default: {
            return state;
        }
    }
};

const persisted = (state: State): Loop<State, Action> =>
    loop(
        state,
        Cmd.run(persistState, {
            args: [state],
        }),
    );
