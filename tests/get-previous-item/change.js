import expect from 'expect';

export default function(editor) {
    const previousItem = editor.getPreviousItem();
    expect(previousItem.key).toBe('previous_item');
}
