import expect from 'expect';

export default function(editor) {
    const { value } = editor;
    const initialText = value.startBlock.text;
    const initialSelection = value.selection;

    editor.wrapInList();
    editor.undo();

    // Back to previous cursor position
    expect(value.startBlock.text).toEqual(initialText);
    expect(value.selection.toJS()).toEqual(initialSelection.toJS());

    return editor;
}
