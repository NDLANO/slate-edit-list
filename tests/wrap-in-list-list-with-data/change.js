export default function(editor) {
  const data = { style: { listStyleType: "disc" } };
  return editor.wrapInList(false, data);
}
