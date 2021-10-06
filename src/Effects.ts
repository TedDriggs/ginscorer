import { isState, State } from './State';

const LOCAL_STORAGE_KEY = 'reduxState';

/**
 * Write the current redux state into local storage.
 */
export const persistState = (state: State): Promise<void> => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    return Promise.resolve();
};

/**
 * Read the redux state from local storage.
 */
export const retrieveState = (): State | undefined => {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;

    try {
        const parsed = JSON.parse(raw);
        if (!isState(parsed)) return;
        try {
            return State.modernize(parsed);
        } catch (e) {
            console.error(e);
            return;
        }
    } catch (e) {
        console.error('Could not read state as JSON', e);
        return;
    }
};
