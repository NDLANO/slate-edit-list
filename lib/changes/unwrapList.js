// @flow
import { type Editor } from 'slate';

import type Options from '../options';

/**
 * Unwrap items at range from their list.
 */
function unwrapList(opts: Options, editor: Editor): editor {
    const items = editor.getItemsAtRange();
    if (items.isEmpty()) {
        return;
    }

    editor.withoutNormalizing(() => {
        // Unwrap the items from their list
        items.forEach(item => editor.unwrapNodeByKey(item.key));

        // Parent of the list of the items
        // node type = 'list-item'
        const firstItem = items.first();
        const parent = editor.value.document.getParent(firstItem.key);

        let index = parent.nodes.findIndex(node => node.key === firstItem.key);

        // Unwrap the items' children
        items.forEach(item =>
            item.nodes.forEach(node => {
                if (node.get('type') === opts.typeDefault) {
                    // we wrap the first element in paragraph
                    const firstNode = node.nodes.first();
                    editor.wrapBlockByKey(firstNode.key, 'paragraph');
                    const paragraphNode = editor.value.document.getParent(
                        firstNode.key
                    );
                    // Add the rest of the elements to the paragraph, before moving the paragraph
                    // out of the list
                    node.nodes.slice(1).forEach((innerNode, nodeIndex) => {
                        editor.moveNodeByKey(
                            innerNode.key,
                            paragraphNode.key,
                            nodeIndex + 1
                        );
                    });
                    editor.moveNodeByKey(paragraphNode.key, parent.key, index);
                    index += 1;
                } else {
                    editor.moveNodeByKey(node.key, parent.key, index);
                    index += 1;
                }
            })
        );

        // Finally, remove the now empty items
        items.forEach(item => editor.removeNodeByKey(item.key));
    });
}

export default unwrapList;
