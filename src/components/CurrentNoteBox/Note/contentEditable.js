import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/* globals window document */
/* eslint-disable react/no-find-dom-node */

export default class ContentEditable extends Component {
    static propTypes = {
        edited: PropTypes.string.isRequired,
        currentNote: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.string,
            edited: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number,
        }).isRequired,
        html: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    state = { html: '' }

    componentWillMount = () => {
        const { html } = this.props;
        this.setState({ html });
    }

    shouldComponentUpdate = (nextProps) => {
        if (nextProps.html !== ReactDOM.findDOMNode(this).innerHTML) { return true; }
        return false;
    }

    emitChange = () => {
        const { onChange, edited } = this.props;
        const html = ReactDOM.findDOMNode(this).innerHTML;
        if (onChange && html !== this.lastHtml) {
            if (edited === 'content') {
                if (html) {
                    onChange({
                        data: html,
                    }, 'content');
                } else {
                    onChange({
                        data: '',
                    }, 'content');
                }
            } else if (edited === 'name') {
                if (html) {
                    onChange({
                        data: html,
                    }, 'name');
                } else {
                    const range = document.createRange();
                    range.setStart(this.container, 0);
                    setTimeout(() => {
                        onChange({ data: '' }, 'name');
                        // ReactDOM.findDOMNode(this).blur();
                    }, 0);
                }
            }
        }
        this.lastHtml = html;
    }

    componentDidUpdate = () => {
        const { html } = this.props;
        if (html !== ReactDOM.findDOMNode(this).innerHTML) {
            ReactDOM.findDOMNode(this).innerHTML = html;
        }
    }

    clearSelection = () => {
        const { edited } = this.props;
        if (edited === 'name' && window.getSelection) {
            const sel = window.getSelection();
            const range = document.createRange();
            range.setStart(this.container, 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    setContainerRef = (ref) => {
        this.container = ref;
    }

    render() {
        const { html } = this.state;
        return (
            <div
              ref={this.setContainerRef}
              onSelect={this.clearSelection}
              onInput={this.emitChange}
              onBlur={this.emitChange}
              contentEditable
              dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }
}
