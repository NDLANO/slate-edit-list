// @flow
/* global document */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';

import PluginEditList from '../lib/';

import INITIAL_VALUE from './value';

const plugin = PluginEditList();
const plugins = [plugin];

function renderBlock(props, editor, next) {
    const { node, attributes, children } = props;
    const isCurrentItem = editor.getItemsAtRange().contains(node);

    switch (node.type) {
        case 'ul_list':
            return <ul {...attributes}>{children}</ul>;
        case 'ol_list':
            return <ol {...attributes}>{children}</ol>;

        case 'list_item':
            return (
                <li
                    className={isCurrentItem ? 'current-item' : ''}
                    title={isCurrentItem ? 'Current Item' : ''}
                    {...props.attributes}
                >
                    {props.children}
                </li>
            );

        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return <p {...attributes}>{children}</p>;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };
    editor;

    renderToolbar() {
        const {
            wrapInList,
            unwrapList,
            increaseItemDepth,
            decreaseItemDepth
        } = plugin.commands;
        const inList = false; //plugin.queries.isSelectionInList(this.editor);

        return (
            <div>
                <button
                    className={inList ? 'active' : ''}
                    onClick={() => this.call(inList ? unwrapList : wrapInList)}
                >
                    <i className="fa fa-list-ul fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.call(decreaseItemDepth)}
                >
                    <i className="fa fa-outdent fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.call(increaseItemDepth)}
                >
                    <i className="fa fa-indent fa-lg" />
                </button>

                <span className="sep">·</span>

                <button onClick={() => this.call(wrapInList)}>
                    Wrap in list
                </button>
                <button onClick={() => this.call(unwrapList)}>
                    Unwrap from list
                </button>
            </div>
        );
    }

    call(command) {
        this.setState({
            value: this.editor.command(command).value
        });
    }

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    render() {
        return (
            <div>
                {this.renderToolbar()}
                <Editor
                    ref={editor => this.editor = editor}
                    placeholder="Enter some text..."
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onChange}
                    renderBlock={renderBlock}
                    shouldNodeComponentUpdate={props =>
                        // To update the highlighting of nodes inside the selection
                        props.node.type === 'list_item'
                    }
                />
            </div>
        );
    }
}

// $FlowFixMe
ReactDOM.render(<Example />, document.getElementById('example'));
