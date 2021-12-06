export * from './outcome';

export enum Player {
    One = 1,
    Two = 2,
}

export const PLAYERS = [Player.One, Player.Two];

export interface PlayerNames {
    player1Name: string;
    player2Name: string;
}

/**
 * Get the name of a player from a pair of names.
 */
export const nameOfPlayer = (players: PlayerNames, player: Player): string =>
    player === Player.One ? players.player1Name : players.player2Name;

/**
 * Get the opponent of the passed-in player.
 */
export const otherPlayer = (player: Player): Player =>
    player === Player.One ? Player.Two : Player.One;

export enum Gin {
    None = 'none',
    Normal = 'normal',
    Super = 'super',
}

/**
 * A single game of gin; undercuts are not tracked separately.
 */
export interface Game {
    winner: Player;
    points: number;
    gin: Gin;
}

export const Game = {
    /**
     * Range of points a player can get in a single game.
     *
     * To get the max, the winner needs gin, while the opponent has
     * 2xKs, 2xQs, 2xJs, 2x10s, and 2x9s, in alternating suits that
     * prevent a run.
     */
    VALID_POINTS: {
        min: 1,
        max: 98,
    },
    guard: (x: any): x is Game =>
        typeof x === 'object' &&
        x !== null &&
        x.winner !== null &&
        x.winner !== undefined &&
        typeof x.points === 'number' &&
        x.points >= Game.VALID_POINTS.min &&
        x.points <= Game.VALID_POINTS.max &&
        typeof x.gin === 'string',
};
