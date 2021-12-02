import { FC } from 'react';

import { connect } from 'react-redux';
import { Button } from '../../components/Button';
import { PlayerNames } from '../../models';
import { creators } from '../../Actions';
import { PlayersForm } from '../../components/PlayersForm';
import {
    canUndoSelector,
    matchHasStartedSelector,
    playerNameSelector,
} from '../../Reducer';
import { State } from '../../State';

interface StateProps {
    playerNames: PlayerNames;
    canUndo: boolean;
    hasMatchStarted: boolean;
}

interface DispatchProps {
    onRenamePlayers: typeof creators.RenamePlayers;
    onStartNewMatch(): void;
    onUndoGame(): void;
}

const mapStateToProps = (state: State): StateProps => ({
    playerNames: playerNameSelector(state),
    canUndo: canUndoSelector(state),
    hasMatchStarted: matchHasStartedSelector(state),
});

const mapDispatchToProps: DispatchProps = {
    onStartNewMatch: creators.StartNewMatch,
    onRenamePlayers: creators.RenamePlayers,
    onUndoGame: creators.UndoGame,
};

const DisconnectedCommandBar: FC<StateProps & DispatchProps> = props => (
    <div className="c-command-bar">
        <Button onClick={props.onUndoGame} disabled={!props.canUndo}>
            Undo Last Game
        </Button>
        <Button
            onClick={props.onStartNewMatch}
            disabled={!props.hasMatchStarted}
            confirmation="Are you sure you want to start a new match?"
        >
            New Match
        </Button>
        <PlayersForm
            defaultValue={props.playerNames}
            onSubmit={props.onRenamePlayers}
        />
    </div>
);

export const CommandBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisconnectedCommandBar);
