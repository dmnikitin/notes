import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import { connect } from 'react-redux';
import { today } from '../../../../helpers/helpers';
import customStyles from '../../../../sass/selectstyles';
import {
    deleteNote,
    changeNote,
    addTag,
    makeNoteActive,
} from '../../../../store/ac';

const ToolbarMeta = ({ notes, tags, currentNote, onChangeNote, onDeleteNote, onAddTag, onToggleDisplay }) => {
    const notePositionInStoreArray = notes.findIndex(e => e.index === currentNote.index);
    const change = currentNote;
    change.edited = today;

    const priorityChange = () => {
        change.priority = !currentNote.priority;
        onChangeNote(change, notePositionInStoreArray);
    };

    const handleTagChange = (newValue) => {
        change.tags = newValue;
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
        if (tags.every(i => i.value !== newValue.value)) {
            onAddTag(newValue);
        }
    };

    const deleteNoteHandler = () => onDeleteNote(notePositionInStoreArray);
    const backToMain = () => onToggleDisplay(0);
    const prioritySpan = change.priority
        ? <button type="button" onClick={priorityChange}><span className="fa fa-star" /></button>
        : <button type="button" onClick={priorityChange}><span className="fa fa-star-o" /></button>;
    const placeholder = change.tags.value
        ? (
            <span className="fa fa-folder-o">
                ....
                {change.tags.value}
            </span>
        )
        : <span className="fa fa-folder-o"> Add a tag  </span>;

    return (
        <div className="toolbarMeta">
            <button type="button" onClick={backToMain}>
                <span className="fa fa-angle-left"> </span>
            </button>
            {prioritySpan}
            <button type="button" onClick={deleteNoteHandler}>
                <span className="fa fa-trash-o" />
            </button>
            <CreatableSelect
              isClearable
              placeholder={placeholder}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={handleTagChange}
              styles={customStyles}
              options={tags}
            />
        </div>
    );
};

export default connect(
    state => ({
        notes: state.notes,
        tags: state.tags,
    }),
    dispatch => ({
        onDeleteNote: noteIndex => dispatch(deleteNote(noteIndex)),
        onChangeNote: (value, noteIndex) => dispatch(changeNote(value, noteIndex)),
        onAddTag: value => dispatch(addTag(value)),
        onToggleDisplay: noteIndex => dispatch(makeNoteActive(noteIndex)),
    }),
)(ToolbarMeta);

ToolbarMeta.defaultProps = {
    tags: [],
};

ToolbarMeta.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    tags: PropTypes.arrayOf(PropTypes.object),
    currentNote: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
        edited: PropTypes.string,
        priority: PropTypes.bool,
        location: PropTypes.string,
        date: PropTypes.string,
        index: PropTypes.number,
    }).isRequired,
    onDeleteNote: PropTypes.func.isRequired,
    onChangeNote: PropTypes.func.isRequired,
    onAddTag: PropTypes.func.isRequired,
    onToggleDisplay: PropTypes.func.isRequired,
};
