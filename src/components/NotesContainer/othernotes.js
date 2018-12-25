import React from 'react';
import NotePreview from './NotePreview/notepreview.js';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const OtherNotes = ({ notes, changeNotesList, toggleDisplay }) => {
	   let otherNotesArray = notes.filter(note => note.priority === false);
	   let otherNotes = otherNotesArray.map(item => (
              <CSSTransition  key={item.index} timeout={300} classNames="fade">
				<NotePreview  notes={notes} currentNote={item} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>
			 </CSSTransition>
			))
	   return <div className="otherNotes"> <h5>Other Notes</h5>{otherNotes} </div>
}

export default OtherNotes;