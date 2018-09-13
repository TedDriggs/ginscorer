import * as React from 'react';

import { connect } from 'react-redux';
import { Button } from 'src/components/Button';
import { creators } from '../../Actions';
import { PlayersForm, PlayersFormProps } from '../../components/PlayersForm';
import { playerNameSelector } from '../../Reducer';
import { State } from '../../State';

interface StateProps {
    playerNames: PlayersFormProps['value'];
}

interface DispatchProps {
    onRenamePlayers: typeof creators.RenamePlayers;
    onStartNewMatch(): void;
}

const mapStateToProps = (state: State): StateProps => ({
    playerNames: playerNameSelector(state),
});

const mapDispatchToProps: DispatchProps = {
    onStartNewMatch: creators.StartNewMatch,
    onRenamePlayers: creators.RenamePlayers,
};

const DisconnectedCommandBar: React.SFC<StateProps & DispatchProps> = props => (
    <div className="c-command-bar">
        <Button onClick={props.onStartNewMatch}>New Match</Button>
        <PlayersForm
            value={props.playerNames}
            onPlayersSubmit={props.onRenamePlayers}
        />
    </div>
);

export const CommandBar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisconnectedCommandBar);
