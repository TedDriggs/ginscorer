import { Game, Player, PlayerNames } from './models';

/**
 * Action emitted when a game has been finished and a new result is ready.
 * The provided game will be added to the end of the game list.
 */
export interface FinishGame {
    type: 'FinishGame';
    result: Game;
}

/**
 * Remove the most recent game from the history; useful for correcting
 * mistakes in submission.
 */
export interface UndoGame {
    type: 'UndoGame';
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

export interface SetInitialDealer {
    type: 'SetInitialDealer';
    dealer: Player;
}

export type Action =
    | RenamePlayers
    | FinishGame
    | StartNewMatch
    | UndoGame
    | SetInitialDealer;

export const creators = {
    UndoGame: (): UndoGame => ({
        type: 'UndoGame',
    }),
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
    SetInitialDealer: (dealer: Player): SetInitialDealer => ({
        type: 'SetInitialDealer',
        dealer,
    }),
};
