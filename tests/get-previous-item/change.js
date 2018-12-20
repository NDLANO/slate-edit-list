import expect from "expect";

export default function(editor) {
  const previousItem = editor.getPreviousItem(editor.value);
  expect(previousItem.key).toBe("previous_item");
}
