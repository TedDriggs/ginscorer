import { Game, Player } from '.';

// Output models for showing the result of a match.

/**
 * A bonus awarded to a player at the end of a set. For example,
 * the first player to exceed 100 game points receives a 100-point
 * bonus for "going over".
 */
export interface Bonus {
    player: Player;
    points: number;
    label: string;
}

export interface GameInSet extends Game {
    runningTotal: number;
}

export interface GinSet {
    games: GameInSet[];
    bonuses: Bonus[];
}

export interface GinMatch {
    player1Name: string;
    player2Name: string;
    sets: GinSet[];
}

export const reduceGames = (games: Game[]): GinSet[] => [
    reduceSet(games),
    reduceSet(games, 1),
    reduceSet(games, 2),
];

/**
 * Transform a sequence of games into a set.
 * @param games A raw sequence of games
 * @param offset The 0-indexed frame number. In gin, a player's first win
 * is not propagated to frames 2 or 3.
 */
export const reduceSet = (games: Game[], offset: number = 0): GinSet => {
    const wins = {
        [Player.One]: offset,
        [Player.Two]: offset,
    };

    const scores = {
        [Player.One]: 0,
        [Player.Two]: 0,
    };

    const setGames: GameInSet[] = [];
    const bonuses: Bonus[] = [];

    for (const game of games) {
        // For frame 2 and frame 3, skip games that don't qualify
        if (wins[game.winner] > 0) {
            wins[game.winner] -= 1;
            continue;
        }

        scores[game.winner] += game.points;
        const runningTotal = scores[game.winner];

        setGames.push({
            ...game,
            runningTotal,
        });

        if (runningTotal >= 100) {
            bonuses.push({
                player: game.winner,
                points: 100,
                label: 'Going out'
            });

            break;
        }
    }

    return {
        bonuses,
        games: setGames,
    };
};
