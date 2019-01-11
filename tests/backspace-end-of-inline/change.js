export default function(editor) {
    editor.run('onKeyDown', {
        preventDefault: () => {},
        stopPropagation: () => {},
        key: 'Backspace'
    });

    return editor;
}
