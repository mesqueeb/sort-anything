declare class Sort {
    array: any[];
    constructor(array: any[]);
    by(...args: (string[] | string[][])): any[];
}
declare const sort: (array: any[]) => Sort;
export default sort;
