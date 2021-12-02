import { PureComponent, ReactNode } from 'react';

import { GinSet, PlayerNames } from '../../models';
import { ToggleDrawer } from '../Drawer';
import { ScoreColumn } from '../ScoreColumn';
import './SetView.scss';
import { SetSummary } from './Summary';

export interface SetViewProps extends PlayerNames {
    value: GinSet;
}

export class SetView extends PureComponent<SetViewProps> {
    public render(): ReactNode {
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
