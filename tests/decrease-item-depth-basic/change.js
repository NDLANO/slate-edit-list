export default function(plugin, change) {
    const { value } = change;
    const selectedBlock = value.document.getDescendant('_selection_key');
    change.moveToStartOfNode(selectedBlock).moveForward(2);

    return plugin.changes.decreaseItemDepth(change);
}
