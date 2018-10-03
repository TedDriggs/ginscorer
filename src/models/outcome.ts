import { Game, Gin, otherPlayer, Player, PlayerNames, PLAYERS } from '.';

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

export type GinSet = GinSetInProgress | GinSetFinal;

export interface GinSetInProgress {
    games: GameInSet[];
    currentScores: {
        [Player.One]: number;
        [Player.Two]: number;
    };
    bonuses: Bonus[];
    finalResult?: never;
}

export interface GinSetFinal {
    games: GameInSet[];
    currentScores?: never;
    bonuses: Bonus[];
    finalResult: GinSetResult;
}

export interface GinSetResult {
    winner: Player;
    /**
     * The total number of points the player earned for the set.
     */
    points: number;
}

export interface GinMatch extends PlayerNames {
    sets: GinSet[];
    finalResult?: GinMatchResult;
}

export interface GinMatchResult {
    /**
     * Whether the winning player won every single match. In this case,
     * the `points` property will be 2x the sum of the three sets.
     */
    isHollywood: boolean;
    winner: Player;
    points: number;
}

export const reduceGamesToMatch = (players: PlayerNames) => (
    games: Game[],
): GinMatch => {
    const sets = reduceGames(games);
    const finalResult = sets.every(isSetFinished)
        ? computeMatchResult(sets, games)
        : undefined;

    return {
        ...players,
        sets,
        finalResult,
    };
};

/**
 * Reduce a sequence of games into three sets.
 *
 * @param games A sequence of games in order played
 */
export const reduceGames = (games: Game[]): [GinSet, GinSet, GinSet] => {
    const [frame1, frame1End] = reduceSet(games);
    const [frame2, frame2End] = reduceSet(games, 1, frame1End);
    const [frame3] = reduceSet(games, 2, frame2End);

    return [frame1, frame2, frame3];
};

/**
 * Checks if a set is finished. This function assumes that sets are built by
 * `reduceSet` and therefore will always have bonuses applied as soon as a
 * player "goes out".
 */
export const isSetFinished = (ginSet: GinSet): ginSet is GinSetFinal =>
    Boolean(ginSet.finalResult);

export const isSetInProgress = (ginSet: GinSet): ginSet is GinSetInProgress =>
    Boolean(ginSet.currentScores);

/**
 * Transform a sequence of games into a set.
 * @param games A raw sequence of games
 * @param offset The 0-indexed frame number. In gin, a player's first win
 * is not propagated to frames 2 or 3.
 * @param prevEndIndex The index of the last game from the previous set.
 *
 * @return An array containing a gin set, and - if the set is finished - the
 * index of the last game processed.
 */
const reduceSet = (
    games: Game[],
    offset: number = 0,
    prevEndIndex?: number,
): [GinSet, number?] => {
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

    for (const [index, game] of games.entries()) {
        // If we've passed the end of the previous set, then all wins
        // going forward are eligible for this set. We represent this
        // by zeroing out the win counters.
        if (typeof prevEndIndex === 'number' && index === prevEndIndex + 1) {
            wins[Player.One] = Math.max(wins[Player.One], 0);
            wins[Player.Two] = Math.max(wins[Player.Two], 0);
        }

        // Increment win counter to maybe qualify for frame and to
        // ensure the player gets credit for the win in bonus calculation.
        wins[game.winner] += 1;

        // For frame 2 and frame 3, skip games that don't qualify
        if (wins[game.winner] <= 0) continue;

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

            PLAYERS.forEach(player => {
                if (wins[player] > 0) {
                    bonuses.push({
                        player,
                        points: 10 * wins[player],
                        label: 'Wins',
                    });
                }
            });

            PLAYERS.forEach(player => {
                const points = setGames
                    .filter(wonBy(player))
                    .reduce((bonus, g) => bonus + ginBonus(g.gin), 0);

                if (points) {
                    bonuses.push({
                        player,
                        points,
                        label: 'Gins',
                    });
                }
            });

            if (wins[Player.Two] <= 0) {
                bonuses.push({
                    player: Player.One,
                    points:
                        runningTotal +
                        bonuses
                            .filter(g => g.player === Player.One)
                            .reduce((b, { points }) => b + points, 0),
                    label: 'Blitz',
                });
            }

            if (wins[Player.One] <= 0) {
                bonuses.push({
                    player: Player.Two,
                    points:
                        runningTotal +
                        bonuses
                            .filter(g => g.player === Player.Two)
                            .reduce((b, { points }) => b + points, 0),
                    label: 'Blitz',
                });
            }

            scores[Player.One] += bonuses
                .filter(g => g.player === Player.One)
                .reduce((b, { points }) => b + points, 0);

            scores[Player.Two] += bonuses
                .filter(g => g.player === Player.Two)
                .reduce((b, { points }) => b + points, 0);

            const finalResult = {
                winner: getWinner(scores),
                points: Math.abs(scores[Player.One] - scores[Player.Two]),
            };

            // We don't include running totals if the game has ended
            return [{ bonuses, finalResult, games: setGames }, index];
        }
    }

    return [
        {
            bonuses,
            currentScores: scores,
            games: setGames,
        },
        // The game didn't end, so no end marker is returned.
        undefined,
    ];
};

const getWinner = (scores: {
    [Player.One]: number;
    [Player.Two]: number;
}): Player =>
    scores[Player.One] > scores[Player.Two] ? Player.One : Player.Two;

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

const wonBy = (player: Player) => (game: Game): boolean =>
    game.winner === player;

const computeMatchResult = (sets: GinSet[], games: Game[]): GinMatchResult => {
    const scores = {
        [Player.One]: 0,
        [Player.Two]: 0,
    };

    sets.forEach(v => (scores[v.finalResult!.winner] += v.finalResult!.points));

    const winner = getWinner(scores);
    const isHollywood = games.every(wonBy(winner));
    return {
        winner,
        isHollywood,
        points: isHollywood
            ? 2 * scores[winner]
            : scores[winner] - scores[otherPlayer(winner)],
    };
};
