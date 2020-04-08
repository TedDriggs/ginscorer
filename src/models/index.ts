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
    guard: (x: any): x is Game =>
        x.winner !== null &&
        typeof x === 'object' &&
        typeof x.points === 'number' &&
        typeof x.gin === 'string' &&
        x.winner !== undefined,
};
