import expect from "expect";

export default function(editor) {
  const initialText = editor.value.startBlock.text;
  const initialSelection = editor.value.selection;

  editor.splitListItem();
  editor.undo();

  // Back to previous cursor position
  expect(editor.value.startBlock.text).toEqual(initialText);
  expect(editor.value.selection.toJS()).toEqual(initialSelection.toJS());

  return editor;
}
