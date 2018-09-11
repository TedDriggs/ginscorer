import { Game, Gin, Player } from '.';

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
    /**
     * Map of player ID to win count, adjusted for the frame entry requirement.
     * This is used for applying bonuses for win count at the end of the frame,
     * in addition to gating game entry into the frame.
     */
    const wins = {
        [Player.One]: offset * -1,
        [Player.Two]: offset * -1,
    };

    const scores = {
        [Player.One]: 0,
        [Player.Two]: 0,
    };

    const setGames: GameInSet[] = [];
    const bonuses: Bonus[] = [];

    for (const game of games) {
        // For frame 2 and frame 3, skip games that don't qualify
        wins[game.winner] += 1;
        if (wins[game.winner] < 0) {
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
                label: 'Going out',
            });

            if (wins[Player.One] > 0) {
                bonuses.push({
                    player: Player.One,
                    points: 10 * wins[Player.One],
                    label: 'Wins',
                });
            }

            if (wins[Player.Two] > 0) {
                bonuses.push({
                    player: Player.Two,
                    points: 10 * wins[Player.Two],
                    label: 'Wins',
                });
            }

            const player1Gins = setGames
                .filter(g => g.winner === Player.One)
                .reduce((bonus, g) => bonus + ginBonus(g.gin), 0);

            const player2Gins = setGames
                .filter(g => g.winner === Player.Two)
                .reduce((bonus, g) => bonus + ginBonus(g.gin), 0);

            if (player1Gins) {
                bonuses.push({
                    player: Player.One,
                    points: player1Gins,
                    label: 'Gins',
                });
            }

            if (player2Gins) {
                bonuses.push({
                    player: Player.Two,
                    points: player2Gins,
                    label: 'Gins',
                });
            }

            break;
        }
    }

    return {
        bonuses,
        games: setGames,
    };
};

const ginBonus = (gin: Gin): number => {
    switch (gin) {
        case Gin.None:
            return 0;
        case Gin.Normal:
            return 25;
        case Gin.Super:
            return 50;
    }
};
