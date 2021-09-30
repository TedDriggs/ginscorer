import { Game, Gin, otherPlayer, Player } from '.';

export interface PerPlayer<T = number> {
    [Player.One]: T;
    [Player.Two]: T;
}

export interface Stats {
    /**
     * The number of games won by each player in the current match.
     */
    wins: PerPlayer;
    /**
     * The maximum number of consecutive games won by each player in
     * the current match.
     */
    maxStreak: PerPlayer;
    /**
     * The average number of points each player received on winning a
     * game in the current match.
     */
    meanWinSize: PerPlayer;
    /**
     * The max number of points earned by each player in a single game.
     */
    biggestWin: PerPlayer;
    /**
     * The number of games in which a player earned normal and super gins.
     * A gin in multiple columns will only count once in this stat.
     */
    ginGames: PerPlayer<{ [Gin.Normal]: number; [Gin.Super]: number }>;
}

const newPerPlayer = (): PerPlayer => ({
    [Player.One]: 0,
    [Player.Two]: 0,
});

export const reduceGamesToStats = (games: Game[]): Stats => {
    const wins = reduceGamesToWins(games);

    return {
        wins,
        meanWinSize: reduceGamesToMeanPoints(games, wins),
        maxStreak: reduceGamesToMaxStreak(games),
        biggestWin: reduceGamesToBiggestWin(games),
        ginGames: reduceGamesToGins(games),
    };
};

const reduceGamesToWins = (games: Game[]): PerPlayer =>
    games.reduce((state, game) => {
        state[game.winner] += 1;
        return state;
    }, newPerPlayer());

const reduceGamesToMeanPoints = (games: Game[], wins: PerPlayer): PerPlayer => {
    const perPlayer = games.reduce((state, game) => {
        state[game.winner] += game.points;
        return state;
    }, newPerPlayer());
    if (wins[Player.One]) perPlayer[Player.One] /= wins[Player.One];
    if (wins[Player.Two]) perPlayer[Player.Two] /= wins[Player.Two];

    return perPlayer;
};

const reduceGamesToMaxStreak = (games: Game[]): PerPlayer => {
    const currentStreak = newPerPlayer();
    const maxStreak = newPerPlayer();

    for (const game of games) {
        currentStreak[game.winner] += 1;
        currentStreak[otherPlayer(game.winner)] = 0;

        if (currentStreak[game.winner] > maxStreak[game.winner]) {
            maxStreak[game.winner] = currentStreak[game.winner];
        }
    }

    return maxStreak;
};

const reduceGamesToBiggestWin = (games: Game[]): PerPlayer =>
    games.reduce((state, game) => {
        state[game.winner] = Math.max(state[game.winner], game.points);
        return state;
    }, newPerPlayer());

const reduceGamesToGins = (
    games: Game[],
): PerPlayer<{ [Gin.Normal]: number; [Gin.Super]: number }> =>
    games.reduce(
        (state, game) => {
            if (game.gin !== Gin.None) {
                state[game.winner][game.gin] += 1;
            }

            return state;
        },
        {
            [Player.One]: { [Gin.Normal]: 0, [Gin.Super]: 0 },
            [Player.Two]: { [Gin.Normal]: 0, [Gin.Super]: 0 },
        },
    );
