export default function(editor) {
    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Backspace'
        },
        change,
        {}
    );

    return change;
}
