import { RefObject } from 'react';

export const focusRef = (ref: RefObject<{ focus(): void }>): void => {
    if (ref.current) ref.current.focus();
};

export const refChildHasFocus = (ref: RefObject<HTMLElement>) => (): boolean =>
    (ref.current && ref.current.contains(document.activeElement)) || false;

export const mapRef = <T, U>(ref: RefObject<T>, mapFn: (r: T) => U): U | null =>
    ref.current ? mapFn(ref.current) : null;
