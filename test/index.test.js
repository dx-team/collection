const Collection = require('../src');
const sinon = require('sinon');

test('Collection constructor', async () => {
    expect(Collection).toBeInstanceOf(Function);

    const array = new Collection();
    expect(array).toBeInstanceOf(Array);
    expect(array).toBeInstanceOf(Collection);
});

test('Collection push/Shift', async () => {
    const value1 = 100;
    const value2 = 200;
    const array = Collection.from([value1, value2]);

    expect(array.length).toBe(2);
    expect(array.shift()).toBe(value1);
    expect(array.length).toBe(1);
    expect(array.shift()).toBe(value2);
    expect(array.length).toBe(0);
});
test('Collection push/Pop', async () => {
    const value1 = 100;
    const value2 = 200;
    const array = Collection.from([value1, value2]);

    expect(array.length).toBe(2);
    expect(array.pop()).toBe(value2);
    expect(array.length).toBe(1);
    expect(array.pop()).toBe(value1);
    expect(array.length).toBe(0);
});

test('Collection splice', async () => {
    const value1 = 100;
    const value2 = 200;
    const value3 = 300;
    const array = Collection.from([value1, value2, value3]);

    expect(array.length).toBe(3);
    expect(array.splice(1, 1)).toEqual([value2]);
    expect(array.length).toBe(2);
});

test('Events', async () => {
    const value1 = 100;
    const value2 = 200;
    const array = Collection.from([value1, value2, value1, value2, value1, value2, value1, value2]);

    const onEmptySpy = sinon.spy();
    const onPopSpy = sinon.spy();
    const onShiftSpy = sinon.spy();
    const onPushSpy = sinon.spy();
    const onUnshiftSpy = sinon.spy();

    array.on('push', onPushSpy);
    array.on('unshift', onUnshiftSpy);
    array.on('pop', onPopSpy);
    array.on('shift', onShiftSpy);
    array.on('empty', onEmptySpy);

    array.push(value1 + value2);
    sinon.assert.called(onPushSpy);

    array.pop();
    sinon.assert.called(onPopSpy);

    array.unshift(value1 + value2);
    sinon.assert.called(onUnshiftSpy);

    array.shift();
    sinon.assert.called(onShiftSpy);

    expect(array.length).toBe(8);

    while (array.length) {
        array.pop();
    }

    expect(array.length).toBe(0);
    sinon.assert.called(onEmptySpy);
});

test('Events splice', async () => {
    const n = 2;
    const m = 3;
    const array = Collection.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const length = array.length;

    const onSpliceSpy = sinon.spy();
    const onEmptySpy = sinon.spy();

    array.on('splice', onSpliceSpy);
    array.on('empty', onEmptySpy);

    const spliced = array.splice(n, m);
    expect(spliced).toBeInstanceOf(Collection);
    expect(spliced.length).toBe(m);
    expect(array.length).toBe(length - m);
    sinon.assert.called(onSpliceSpy);

    const spliced2 = array.splice(0, array.length);
    expect(array.length).toBe(0);
    expect(spliced2.length).toBe(length - m);

    sinon.assert.called(onEmptySpy);
});