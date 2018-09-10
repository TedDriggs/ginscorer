import { Game } from './models';

/**
 * Action emitted when a game has been finished and a new result is ready.
 * The provided game will be added to the end of the game list.
 */
export interface FinishGame {
    type: 'FinishGame';
    result: Game;
}

/**
 * Start a new match, clearing all game history.
 */
export interface StartNewMatch {
    type: 'StartNewMatch';
}

export type Action = FinishGame | StartNewMatch;

export const creators = {
    FinishGame: (result: Game): FinishGame => ({
        type: 'FinishGame',
        result,
    }),
    StartNewMatch: (): StartNewMatch => ({
        type: 'StartNewMatch',
    }),
};
