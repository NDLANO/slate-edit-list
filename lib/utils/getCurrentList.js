// @flow
import { type Editor, type Block } from 'slate';

import type Options from '../options';
import getListForItem from './getListForItem';

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 */
function getCurrentList(opts: Options, editor: Editor, block?: Block): ?Block {
    const item = editor.getCurrentItem(opts, block);

    if (!item) {
        return null;
    }

    return getListForItem(opts, editor, item);
}

export default getCurrentList;
