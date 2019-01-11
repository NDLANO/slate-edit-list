import expect from 'expect';

export default function(editor) {
    const ret = editor.run('onKeyDown', {
        preventDefault: () => {},
        stopPropagation: () => {},
        key: 'Enter',
        shiftKey: true
    });

    expect(ret == null).toBe(true);
}
