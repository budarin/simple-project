// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pick(object: Record<string, any>, keys: string[]): Record<string, any> {
    let index = -1;
    const length = keys.length;
    const result = {};

    // eslint-disable-next-line fp/no-loops
    while (++index < length) {
        const key = keys[index];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value = object[key];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result[key] = value;
    }
    return result;
}

// function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
//     const ret: { [P in K]: T[P] } = {};

//     keys.forEach((key) => {
//         ret[key] = obj[key];
//     });
//     return ret;
// }
