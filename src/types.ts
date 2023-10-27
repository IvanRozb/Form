// src/types.ts
export type FormField = {
    default_value?: string | number | boolean;
    value?: string | number | boolean;
    validation?: RegExp;
    min_value?: number;
    max_value?: number;
    options?: (string | number)[];
    type: 'text' | 'longtext' | 'dropdown' | 'number';
};
