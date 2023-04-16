// tests/unit/memory.test.js

const {
  writeFragment,
  readFragment,
  writeFragmentData,
  readFragmentData,
} = require('../../src/model/data/memory/index');

describe('memory', () => {
  test('writeFragment() returns nothing', async () => {
    const result = await writeFragment({ ownerId: 'a', id: 'b', fragment: 'test1' });
    expect(result).toBe(undefined);
  });

  test('readFragment() returns what we writeFragment() into the db', async () => {
    const data = { ownerId: 'a', id: 'b', fragment: 'test2' };
    await writeFragment(data);
    const result = await readFragment('a', 'b');
    expect(result).toBe(data);
  });

  test('writeFragmentData() returns nothing', async () => {
    const result = await writeFragmentData('a', 'b', 'test3');
    expect(result).toBe(undefined);
  });

  test('readFragmentData() returns what we writeFragmentData() into the db', async () => {
    const data = 'test4';
    await writeFragmentData('a', 'b', data);
    const result = await readFragmentData('a', 'b');
    expect(result).toBe(data);
  });
});
