import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { creators } from '../Actions';
import { MatchViewer, MatchViewerProps } from '../components/MatchViewer';
import { reduceGames } from '../models';
import { gameSelector, playerNameSelector } from '../Reducer';
import { State } from '../State';

const matchSelector = createSelector(
    gameSelector,
    playerNameSelector,
    (games, players) => ({
        ...players,
        sets: reduceGames(games),
    }),
);

type StateProps = Pick<MatchViewerProps, 'value'>;
type DispatchProps = Pick<MatchViewerProps, 'onSubmitGame'>;

const mapStateToProps = (state: State): StateProps => ({
    value: matchSelector(state),
});

const mapDispatchToProps: DispatchProps = {
    onSubmitGame: creators.FinishGame,
};

export const CurrentMatchViewer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchViewer);
