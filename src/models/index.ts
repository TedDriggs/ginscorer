export * from './outcome';

export enum Player {
    One = 1,
    Two = 2,
}

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

/**
 * Checks if the value is a complete `Game` object.
 */
export const isGame = (x: any): x is Game =>
    typeof x === 'object' &&
    typeof x.points === 'number' &&
    typeof x.gin === 'string' &&
    x.winner !== null &&
    x.winner !== undefined;
