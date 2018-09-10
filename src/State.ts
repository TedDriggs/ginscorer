import { Game } from './models';

export interface State {
    player1Name: string;
    player2Name: string;
    games: Game[];
}

export const INITIAL_STATE: State = {
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    games: [],
};
