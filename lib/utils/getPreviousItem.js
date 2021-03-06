// @flow
import { type Value, type Block } from 'slate';

import type Options from '../options';

/**
 * Return the previous item, from current selection or from a node.
 */
function getPreviousItem(opts: Options, editor: Value, block?: Block): ?Block {
    const { document, startBlock } = editor.value;
    block = block || startBlock;

    const currentItem = editor.getCurrentItem(block);
    if (!currentItem) {
        return null;
    }

    const previousSibling = document.getPreviousSibling(currentItem.key);

    if (!previousSibling) {
        return null;
    }
    if (previousSibling.type === opts.typeItem) {
        return previousSibling;
    }
    return null;
}

export default getPreviousItem;
