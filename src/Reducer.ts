import { Action } from './Actions';
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

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FinishGame': {
            return {
                ...state,
                games: [...state.games, action.result],
            };
        }
        case 'StartNewMatch': {
            return {
                ...state,
                games: [],
            };
        }
        default: {
            return state;
        }
    }
};
