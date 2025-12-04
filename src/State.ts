import { Game, Player } from './models';

export const LATEST_STATE_VERSION = 2 as const;

export interface StateV1 {
    version: 1;
    player1Name: string;
    player2Name: string;
    games: Game[];
}

export const StateV1 = {
    guard: (x: unknown): x is StateV1 =>
        typeof x === 'object' &&
        x !== null &&
        'player1Name' in x &&
        typeof x.player1Name === 'string' &&
        'player2Name' in x &&
        typeof x.player2Name === 'string' &&
        'version' in x &&
        x.version === 1 &&
        'games' in x &&
        Array.isArray(x.games),
};

export interface StateV2 {
    version: 2;
    player1Name: string;
    player2Name: string;
    games: Game[];
    initialDealer: Player;
}

export const StateV2 = {
    guard: (x: unknown): x is StateV2 =>
        typeof x === 'object' &&
        x !== null &&
        'player1Name' in x &&
        typeof x.player1Name === 'string' &&
        'player2Name' in x &&
        typeof x.player2Name === 'string' &&
        'version' in x &&
        x.version === 2 &&
        'games' in x &&
        Array.isArray(x.games) &&
        'initialDealer' in x &&
        Player.guard(x.initialDealer),
};

export type HistoricalState = StateV1 | StateV2;

export type State = StateV2;

export const State = {
    /**
     * Migrate a state object forward to the latest version expected by
     * the app.
     *
     * @param state A valid state emitted by an earlier version of the app
     * @returns A state object on the current version
     */
    modernize: (state: HistoricalState): State => {
        switch (state.version) {
            case 2:
                return state;
            case 1:
                return migrateV1ToV2(state);
            default:
                throw new UnknownVersionError(state);
        }
    },
};

class MigrationError extends Error {
    constructor(message: string, public readonly state: unknown) {
        super(message);
    }
}

class UnknownVersionError extends MigrationError {
    public readonly version: unknown;
    constructor(state: HistoricalState) {
        super(`Unknown state version '${state.version}'`, state);
        this.version = state.version;
    }
}

export const INITIAL_STATE: State = {
    version: LATEST_STATE_VERSION,
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    games: [],
    initialDealer: Player.One,
};

export const isState = (x: any): x is State =>
    typeof x === 'object' &&
    typeof x.player1Name === 'string' &&
    typeof x.player2Name === 'string' &&
    typeof x.version === 'number';

const migrateV1ToV2 = (state: StateV1): StateV2 => ({
    ...state,
    version: 2,
    initialDealer: Player.One,
});
