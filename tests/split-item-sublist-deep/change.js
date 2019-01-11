import expect from "expect";

export default function(editor) {
  editor.splitListItem();

  // check new selection
  const selectedNode = editor.value.document.getTexts().get(2);
  const selectedNodePath = editor.value.document
    .getPath(selectedNode.key)
    .toJS();

  expect(editor.value.selection.toJS()).toMatchObject({
    object: "selection",
    anchor: {
      object: "point",
      offset: 0,
      path: selectedNodePath
    },
    focus: {
      object: "point",
      offset: 0,
      path: selectedNodePath
    },
    isFocused: true,
    marks: null
  });

  return editor;
}
