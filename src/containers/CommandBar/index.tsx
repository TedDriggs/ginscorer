import * as React from 'react';

import { connect } from 'react-redux';
import { Button } from 'src/components/Button';
import { creators } from '../../Actions';

interface DispatchProps {
    onStartNewMatch(): void;
}

const mapDispatchToProps: DispatchProps = {
    onStartNewMatch: creators.StartNewMatch,
};

const DisconnectedCommandBar: React.SFC<DispatchProps> = props => (
    <div className="c-command-bar">
        <Button onClick={props.onStartNewMatch}>New Match</Button>
    </div>
);

export const CommandBar = connect(
    null,
    mapDispatchToProps,
)(DisconnectedCommandBar);
