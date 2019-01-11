// @flow
import { type Editor } from 'slate';

import type Options from '../options';
import getListForItem from './getListForItem';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(
    opts: Options,
    editor: Editor,
    type?: string
): boolean {
    const { value } = editor;
    const items = editor.getItemsAtRange();
    return (
        !items.isEmpty() &&
        // Check the type of the list if needed
        (!type ||
            getListForItem(opts, value, items.first()).get('type') === type)
    );
}

export default isSelectionInList;
