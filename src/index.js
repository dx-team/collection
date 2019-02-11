const EventEmitter = require('events');
const Utils = require('./libs/utils');

const {
    addProp,
    copyMethod,
    decorateWithEmit,
} = Utils;

class Collection extends Array {
    constructor(name, ...args) {
        super(...args);

        addProp(this, 'name', name);

        const events = new EventEmitter();
        copyMethod(this, events, 'on');
        copyMethod(this, events, 'once');
        copyMethod(this, events, 'emit', {
            passthrough: true
        });
        copyMethod(this, events, 'off');

        [
            'copyWithin',
            'fill',
            'find',
            'pop',
            'push',
            'reverse',
            'shift',
            'slice',
            'splice',
            'unshift',
            // 'concat',
            // 'entries',
            // 'every',
            // 'filter',
            // 'findIndex',
            // 'flat',
            // 'flatMap',
            // 'forEach',
            // 'includes',
            // 'indexOf',
            // 'join',
            // 'keys',
            // 'lastIndexOf',
            // 'map',
            // 'reduce',
            // 'reduceRight',
            // 'some',
            // 'sort',
        ].forEach(name => decorateWithEmit(this, super[name], name));

        decorateWithEmit(this, super.push, 'queue');

        this.on('pop', (arr) => (!arr || arr.length === 0) && (this.emit('empty')));
        this.on('shift', (arr) => (!arr || arr.length === 0) && (this.emit('empty')));
        this.on('splice', (arr) => (!arr || arr.length === 0) && (this.emit('empty')));
    }
}

module.exports = Collection;
module.exports.default = Collection;