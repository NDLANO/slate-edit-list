export default function(editor) {
    return plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Enter'
        },
        change,
        {}
    );
}
