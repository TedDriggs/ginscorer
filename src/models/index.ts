export * from './outcome';

const PLAYER_ONE = 1 as const;
const PLAYER_TWO = 2 as const;

export type Player = typeof PLAYER_ONE | typeof PLAYER_TWO;

export const Player = {
    One: PLAYER_ONE,
    Two: PLAYER_TWO,
    guard: (x: unknown): x is Player => x === PLAYER_ONE || x === PLAYER_TWO,
};

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

const GIN_NONE = 'none' as const;
const GIN_NORMAL = 'normal' as const;
const GIN_SUPER = 'super' as const;

export type Gin = typeof GIN_NONE | typeof GIN_NORMAL | typeof GIN_SUPER;

export const Gin = {
    None: GIN_NONE,
    Normal: GIN_NORMAL,
    Super: GIN_SUPER,
};

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
