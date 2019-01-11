import expect from 'expect';

export default function(editor) {
    editor.run('onKeyDown', {
        preventDefault: () => {},
        stopPropagation: () => {},
        key: 'Backspace'
    });

    // Selection check
    expect(editor.value.startBlock.text).toEqual('');
    expect(editor.value.selection.anchor.offset).toEqual(0);
    expect(editor.value.selection.isCollapsed).toBe(true);

    return editor;
}
