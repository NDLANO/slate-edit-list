// @flow
import { type Editor } from 'slate';

import type Options from '../options';

/**
 * User pressed Delete in an editor
 */
function onBackspace(
    opts: Options,
    event: *,
    editor: Editor,
    next
): void | any {
    const { value } = editor;
    const { selection } = value;
    const { start, isCollapsed, isExpanded } = selection;

    // Only unwrap...
    // ... with a collapsed selection
    if (isExpanded) {
        return next();
    }

    // ... when at the beginning of nodes
    if (start.offset > 0) {
        return next();
    }
    // ... in a list
    const currentItem = editor.getCurrentItem();
    if (!currentItem) {
        return next();
    }
    // ... more precisely at the beginning of the current item
    if (!isCollapsed || !start.isAtStartOfNode(currentItem)) {
        return next();
    }

    event.preventDefault();
    return editor.unwrapList();
}

export default onBackspace;
