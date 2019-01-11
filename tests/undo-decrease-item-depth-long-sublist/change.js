import expect from 'expect';

export default function(editor) {
    editor.decreaseItemDepth();
    editor.undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('Item 1.1');

    return editor;
}
