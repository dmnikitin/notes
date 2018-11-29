import React from 'react';
import PropTypes from 'prop-types';
import NotePreview    from './notepreview.js';

const NotesContainer = ({notes, changeNotesList, toggleDisplay}) => {
	
	if (notes.length!=0) {
	const allNotes = notes.map((item, key) => <NotePreview key={key} notes={notes} currentNote={item} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>)
	return  <div className="notesContainer">{allNotes}</div>
		}
		else {return null}
    }


NotesContainer.propTypes = {
		notes: PropTypes.array, 
		changeNotesList: PropTypes.func,
		toggleDisplay: PropTypes.func

	}

export default NotesContainer;