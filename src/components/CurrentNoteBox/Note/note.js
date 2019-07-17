import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolbarMeta from './ToolbarMeta/toolbarMeta';
import ToolbarMarkdown from './ToolbarMarkdown/toolbarMarkdown';
import NoteInfoBar from './NoteInfoBar/noteinfobar';
import ContentEditable from './contentEditable';
import { today } from '../../../helpers/helpers';
import { changeNote } from '../../../store/ac';

class Note extends React.Component {
    static propTypes = {
        notes: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    }

    state = { name: '', content: '' }

    componentWillMount = () => {
        const { currentNote } = this.props;
        this.setState({ name: currentNote.name, content: currentNote.content });
    }

    handleChange = (e, index) => {
        const { notes, currentNote, onChangeNote } = this.props;
        const notePositionInStoreArray = notes.findIndex(note => note.index === currentNote.index);
        const change = currentNote;
        if (index === 'name') {
            this.setState({ name: e.data });
            change.name = e.data;
        } else if (index === 'content') {
            this.setState({ content: e.data });
            change.content = e.data;
        }
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
    }

    render() {
        const { currentNote } = this.props;
        return (
            <div className="note">
                <ToolbarMeta currentNote={currentNote} />
                <div className="note-name">
                    <ContentEditable edited="name" currentNote={currentNote} html={currentNote.name} onChange={this.handleChange} />
                </div>
                <div className="note-content">
                    <ContentEditable edited="content" currentNote={currentNote} html={currentNote.content} onChange={this.handleChange} />
                </div>
                <ToolbarMarkdown currentNote={currentNote} />
                <NoteInfoBar currentNote={currentNote} />
            </div>
        );
    }
}

export default connect(
    state => ({
        notes: state.notes,
    }),
    dispatch => ({
        onChangeNote: (value, noteIndex) => dispatch(changeNote(value, noteIndex)),
    }),
)(Note);
