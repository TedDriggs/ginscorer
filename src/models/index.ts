export * from './outcome';

export enum Player {
    One = 1,
    Two = 2,
}

export enum Gin {
    Normal = 'normal',
    Super = 'super',
}

/**
 * A single game of gin; undercuts are not tracked separately.
 */
export interface Game {
    winner: Player;
    points: number;
    gin?: Gin;
}
