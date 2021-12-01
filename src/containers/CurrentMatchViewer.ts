import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { creators } from '../Actions';
import { MatchViewer, MatchViewerProps } from '../components/MatchViewer';
import { reduceGamesToMatch } from '../models';
import { gameSelector, playerNameSelector } from '../Reducer';
import { State } from '../State';

const matchSelector = createSelector(gameSelector, reduceGamesToMatch);

type StateProps = Pick<MatchViewerProps, 'value' | 'players'>;
type DispatchProps = Pick<MatchViewerProps, 'onSubmitGame' | 'onNewMatch'>;

const mapStateToProps = (state: State): StateProps => ({
    value: matchSelector(state),
    players: playerNameSelector(state),
});

const mapDispatchToProps: DispatchProps = {
    onSubmitGame: creators.FinishGame,
    onNewMatch: creators.StartNewMatch,
};

export const CurrentMatchViewer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MatchViewer);
