import * as React from 'react';
import { Drawer } from '.';

export interface ToggleDrawerProps {
    activator(props: { openDrawer(): void }): React.ReactNode;
}

const INITIAL_STATE = {
    open: false,
};

type State = typeof INITIAL_STATE;

export class ToggleDrawer extends React.Component<ToggleDrawerProps, State> {
    constructor(props: ToggleDrawerProps) {
        super(props);
        this.state = INITIAL_STATE;
    }

    public render(): React.ReactNode {
        const { activator, children } = this.props;
        return (
            <>
                {activator({ openDrawer: this.openDrawer })}
                <Drawer open={this.state.open} onDismiss={this.closeDrawer}>
                    {children}
                </Drawer>
            </>
        );
    }

    private readonly openDrawer = () => {
        this.setState({ open: true });
    };

    private readonly closeDrawer = () => {
        this.setState({ open: false });
    };
}
