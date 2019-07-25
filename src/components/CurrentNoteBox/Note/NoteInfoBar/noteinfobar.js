import React from 'react';
import PropTypes from 'prop-types';

const NoteInfoBar = ({ currentNote }) => {
    const edited = currentNote.edited
        ? (
            <h2>
                Last changed ...
                {currentNote.edited}
            </h2>
        )
        : <h2> not edited yet</h2>;

    return (
        <div className="noteInfoBar">
            <div className="note-edited-date">{edited}</div>
            <h2 className="note-date">
                Note created ...
                {currentNote.date}
            </h2>
            <h2 className="note-location">{currentNote.location}</h2>
        </div>
    );
};

export default NoteInfoBar;


NoteInfoBar.propTypes = {
    currentNote: PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
        edited: PropTypes.string,
        priority: PropTypes.bool,
        location: PropTypes.string,
        date: PropTypes.string,
        index: PropTypes.number,
    }).isRequired,
};
