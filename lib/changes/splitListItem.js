// @flow
import { type Change } from 'slate';

import type Options from '../options';

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts: Options, editor: Change): Change {
    const { value } = editor;
    const currentItem = editor.getCurrentItem();
    if (!currentItem) {
        return editor;
    }

    const { start } = value.selection;
    const splitOffset = start.offset;

    return editor.splitDescendantsByKey(
        currentItem.key,
        start.key,
        splitOffset
    );
}

export default splitListItem;
