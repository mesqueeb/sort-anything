declare class Sort {
    array: any;
    constructor(array: any);
    by(prop: any, direction?: string): any;
}
declare const sort: (array: any) => Sort;
export default sort;
