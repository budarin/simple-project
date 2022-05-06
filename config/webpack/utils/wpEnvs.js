const environments = {
    // The environment supports arrow functions ('() => { ... }').
    arrowFunction: true,
    // The environment supports BigInt as literal (123n).
    bigIntLiteral: true,
    // The environment supports const and let for variable declarations.
    const: true,
    // The environment supports destructuring ('{ a, b } = obj').
    destructuring: true,
    // The environment supports an async import() function to import EcmaScript modules.
    dynamicImport: false,
    // The environment supports 'for of' iteration ('for (const x of array) { ... }').
    forOf: true,
    // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
    module: false,
};

module.exports = environments;
