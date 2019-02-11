const addProp = (target, name, value, options = {}) => {
    Object.defineProperty(target, name, {
        value
    });
};

const copyMethod = (target, source, name, options = {
    passthrough: false
}) => {
    addProp(target, name, ((...args) => {
        const r = source[name](...args);

        if (options.passthrough) return r;

        return target;
    }).bind(target));
};

const decorateWithEmit = (target, source, name) => {
    addProp(target, name, (...args) => {
        target.emit(`pre-${name}`, args, target);

        const value = source.apply(target, args);
        target.emit(name, target, value);
        return value;
    });
};

const Utils = {
    addProp,
    copyMethod,
    decorateWithEmit
};

module.exports = Utils;
module.exports.Utils = Utils;
module.exports.default = Utils;