// @flow
import { type Change, type Node } from 'slate';

import type Options from '../options';

/**
 * Create a schema definition with rules to normalize lists
 */
function schema(opts: Options): Object {
    const constructedSchema = {
        blocks: {
            [opts.typeItem]: {
                parent: opts.types.map(t => ({ type: t })),
                nodes: [{ match: { object: 'block' } }],

                normalize: normalize({
                    parent_type_invalid: (change, context) =>
                        change.withoutSaving(() =>
                            change.unwrapBlockByKey(context.node.key)
                        ),
                    child_object_invalid: (change, context) =>
                        wrapChildrenInDefaultBlock(opts, change, context.node)
                })
            }
        }
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach(type => {
        constructedSchema.blocks[type] = {
            nodes: [{ match: { type: opts.typeItem } }],
            normalize: normalize({
                child_type_invalid: (change, context) =>
                    change.withoutSaving(() =>
                        change.wrapBlockByKey(context.child.key, opts.typeItem)
                    )
            })
        };
    });

    return constructedSchema;
}

/*
 * Allows to define a normalize function through a keyed collection of functions
 */
function normalize(reasons: { [string]: (Change, context: any) => any }): * {
    return (change, error) => {
        const reasonFn = reasons[error.code];
        if (reasonFn) {
            reasonFn(change, error);
        }
    };
}

/**
 * Wraps all child of a node in the default block type.
 * Returns a change, for chaining purposes
 */
function wrapChildrenInDefaultBlock(
    opts: Options,
    change: Change,
    node: Node
): Change {
    change.withoutNormalizing(() => {
        change.withoutSaving(() =>
            change.wrapBlockByKey(node.nodes.first().key, opts.typeDefault)
        );
    });

    const wrapper = change.value.document.getDescendant(node.key).nodes.first();

    // Add in the remaining items
    change.withoutNormalizing(() => {
        change.withoutSaving(() =>
            node.nodes
                .rest()
                .forEach((child, index) =>
                    change.moveNodeByKey(child.key, wrapper.key, index + 1)
                )
        );
    });

    return change;
}

export default schema;
