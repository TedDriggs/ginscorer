import { Game, PlayerNames } from './models';

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

export interface RenamePlayers extends PlayerNames {
    type: 'RenamePlayers';
}

export type Action = RenamePlayers | FinishGame | StartNewMatch;

export const creators = {
    RenamePlayers: (names: PlayerNames): RenamePlayers => ({
        ...names,
        type: 'RenamePlayers',
    }),
    FinishGame: (result: Game): FinishGame => ({
        type: 'FinishGame',
        result,
    }),
    StartNewMatch: (): StartNewMatch => ({
        type: 'StartNewMatch',
    }),
};
