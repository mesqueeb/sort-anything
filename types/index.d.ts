export declare const typeOrderMap: {
    boolean: number;
    number: number;
    string: number;
    symbol: number;
    object: number;
    function: number;
    null: number;
    undefined: number;
};
export declare const sort: <T extends any[]>(array: T) => {
    by: (...args: string[] | string[][]) => T;
};
