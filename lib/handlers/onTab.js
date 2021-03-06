// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { decreaseItemDepth, increaseItemDepth } from '../changes';

/**
 * User pressed Tab in an editor.
 * Tab       -> Increase item depth if inside a list item
 * Shift+Tab -> Decrease item depth if inside a list item
 */
function onTab(opts: Options, event: *, editor: *, next): void | any {
    const { value } = editor;
    const { isCollapsed } = value.selection;

    if (!isCollapsed || !editor.getCurrentItem()) {
        return next();
    }

    event.preventDefault();

    // Shift+tab reduce depth
    if (event.shiftKey) {
        return decreaseItemDepth(opts, editor);
    }

    // Tab increases depth
    return increaseItemDepth(opts, editor);
}

export default onTab;
