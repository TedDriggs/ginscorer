import * as React from 'react';

import { GinSet, PlayerNames } from '../../models';
import { ToggleDrawer } from '../Drawer';
import { ScoreColumn } from '../ScoreColumn';
import './SetView.css';
import { SetSummary } from './Summary';

export interface SetViewProps extends PlayerNames {
    value: GinSet;
}

export class SetView extends React.PureComponent<SetViewProps> {
    public render(): React.ReactNode {
        return (
            <ToggleDrawer
                activator={({ openDrawer }) => (
                    <SetSummary
                        {...this.props}
                        onClick={openDrawer}
                        className="c-set-view"
                    />
                )}
            >
                <ScoreColumn
                    {...this.props}
                    className="c-set-view__score-column"
                />
            </ToggleDrawer>
        );
    }
}
