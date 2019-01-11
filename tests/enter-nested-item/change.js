export default function(editor) {
    return editor.run('onKeyDown', {
        preventDefault: () => {},
        stopPropagation: () => {},
        key: 'Enter'
    });
}
