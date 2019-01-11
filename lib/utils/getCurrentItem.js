// @flow
import { type Editor, type Block } from 'slate';
import type Options from '../options';

/**
 * Return the current list item, from current selection or from a node.
 */
function getCurrentItem(opts: Options, editor: Editor, block?: Block): ?Block {
    const {
        value: { document, selection, startBlock }
    } = editor;

    if (!block) {
        if (!selection.start.key) return null;
        block = startBlock;
    }

    const parent = document.getParent(block.key);
    return parent && parent.type === opts.typeItem ? parent : null;
}

export default getCurrentItem;
