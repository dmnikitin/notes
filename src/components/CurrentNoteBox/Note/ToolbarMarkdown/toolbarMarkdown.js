import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { regexMarkdown, compareStrings, today } from '../../../../helpers/helpers';
import { changeNote } from '../../../../store/ac';

/* globals window Node */

const ToolbarMarkdown = ({ notes, currentNote, onChangeNote }) => {
    const handleChange = (openTag, closeTag) => {
        const sel = window.getSelection();
        const text = sel.toString();
        const position = sel.anchorNode.compareDocumentPosition(sel.focusNode);
        let backward = false;
        // position == 0 if nodes are the same
        if ((!position && sel.anchorOffset > sel.focusOffset)
            || position === Node.DOCUMENT_POSITION_PRECEDING) {
            backward = true;
        }

        const cursorPosition = () => {
            if (backward === true) {
                sel.modify('extend', 'backward', 'paragraphboundary');
            } else {
                sel.modify('extend', 'backward', 'paragraphboundary');
            }
            const pos = sel.toString().length;
            if (sel.anchorNode !== undefined) sel.collapseToEnd();
            return pos;
        };
        const startstr = backward ? cursorPosition() - text.length : cursorPosition();
        const endstr = text.length;
        const change = currentNote;
        const notePositionInStoreArray = notes.findIndex(e => e.index === currentNote.index);
        const trimBullshit = /<[^/>][^>]*><\/[^>]+>/g;
        change.content = change.content.replace(trimBullshit, '');
        let cont = change.content.replace(/(<[^>]*>)*|(<[^>]*>)*/g, '');
        if (cont !== text) {
            cont = cont.split('');
            cont.splice(startstr, endstr, `<parsed>${text}</parsed>`);
            cont = cont.join('');
        } else { cont = `<parsed>${cont}</parsed>`; }
        const finalString = compareStrings(change.content, cont);
        change.content = regexMarkdown(finalString, openTag, closeTag);
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
    };
    const makeBold = handleChange.bind(null, '<b>', '</b>');
    const makeItalic = handleChange.bind(null, '<i>', '</i>');
    const makeUnderline = handleChange.bind(null, '<u>', '</u>');

    return (
        <div className="toolbarMarkdown">
          <button type="button" id="bold" title="Bold (Ctrl+B)" onClick={makeBold}><i className="fa fa-bold" /></button>
          <button type="button" id="italic" title="Italic (Ctrl+I)" onClick={makeItalic}><i className="fa fa-italic" /></button>
          <button type="button" id="underline" title="Underline (Ctrl+U)" onClick={makeUnderline}><i className="fa fa-underline" /></button>
        </div>
    );
};

ToolbarMarkdown.defaultProps = {
    notes: [],
};

ToolbarMarkdown.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    currentNote: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
        edited: PropTypes.string,
        priority: PropTypes.bool,
        location: PropTypes.string,
        date: PropTypes.string,
        index: PropTypes.number,
    }).isRequired,
    onChangeNote: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        notes: state.notes,
    }),
    dispatch => ({
        onChangeNote: (value, noteIndex) => dispatch(changeNote(value, noteIndex)),
    }),
)(ToolbarMarkdown);
