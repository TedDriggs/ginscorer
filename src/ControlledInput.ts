export type ChangeHandler<T> = (newVal: T, name?: string) => void;

export interface ControlledInput<T> {
    value: T;
    disabled?: boolean;
    name?: string;
    onChange: ChangeHandler<T>;
}

export const useFieldChangeHandler =
    <T extends {}>(props: ControlledInput<T>): ChangeHandler<T[keyof T]> =>
    (newVal, fieldName) => {
        const { value, onChange, disabled, name } = props;

        if (disabled) return;

        if (fieldName === undefined) {
            console.error(
                'Field change handler got value',
                newVal,
                'with no field name',
            );
            return;
        }

        onChange?.(
            {
                ...(value as any),
                [fieldName]: newVal,
            },
            name,
        );
    };
