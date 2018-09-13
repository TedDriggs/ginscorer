export interface ConsumableEvent {
    preventDefault(): void;
    stopPropagation(): void;
}

export const consumeEvent = (e: ConsumableEvent) => {
    e.stopPropagation();
    e.preventDefault();
}