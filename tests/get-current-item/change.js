import expect from "expect";

export default function(editor) {
  const currentItem = editor.getCurrentItem(editor.value);
  expect(currentItem.key).toBe("current_item");
}
