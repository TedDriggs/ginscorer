import React, { FC, useState } from 'react';
import { Drawer } from '.';

export const ToggleDrawer: FC<{
    activator(props: { openDrawer(): void }): React.ReactNode;
}> = ({ activator, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {activator({ openDrawer: () => setOpen(true) })}
            <Drawer open={open} onDismiss={() => setOpen(false)}>
                {children}
            </Drawer>
        </>
    );
};
