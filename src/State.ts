import { Game } from './models';

export const STATE_VERSION: 1 = 1;

export interface State {
    version: number;
    player1Name: string;
    player2Name: string;
    games: Game[];
}

export const INITIAL_STATE: State = {
    version: STATE_VERSION,
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    games: [],
};

export const isState = (x: any): x is State =>
    typeof x === 'object' &&
    typeof x.player1Name === 'string' &&
    typeof x.player2Name === 'string';
