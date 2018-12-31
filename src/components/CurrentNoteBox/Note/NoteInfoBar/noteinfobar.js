import React from 'react';

const NoteInfoBar = ({ currentNote }) => {

    let edited;
    currentNote.edited ? edited = <h2>Last changed: {currentNote.edited}</h2> : edited = <h2> not edited yet</h2>
   
    return (
        <div className="noteInfoBar">
	        <div className="note-edited-date">{edited}</div>
			<h2 className="note-date">Note created : {currentNote.date}</h2>
	        <h2 className="note-location">{currentNote.location}</h2>
	    </div>
    )
}

export default NoteInfoBar;