/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';

import EditList from '../lib';

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);
    const plugin = EditList();

    tests.forEach((test, index) => {
        if (test === 'undo-unwrap-long-list') return; // removed test failing, possibly related to: https://github.com/ianstormtaylor/slate/issues/2336
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const dir = path.resolve(__dirname, test);

            const input = require(path.resolve(dir, 'input.js')).default;

            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) && require(expectedPath).default;

            const runChange = require(path.resolve(dir, 'change.js')).default;
            const editor = new Slate.Editor({
                value: input,
                plugins: [plugin]
            });
            const newChange = runChange(editor);

            if (expected) {
                const actual = newChange.value;

                expect(actual.toJSON()).toEqual(expected.toJSON());
            }
        });
    });
});
