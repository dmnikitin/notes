import React from 'react';
import NotePreview from './NotePreview/notepreview.js';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const StarredNotes = ({ notes, changeNotesList, toggleDisplay }) => {
	   let starredNotesArray = notes.filter(note => note.priority===true);
	   let starredNotes = starredNotesArray.map(item => (
              <CSSTransition  key={item.index} timeout={300} classNames="fade"> 
              	<NotePreview  notes={notes} currentNote={item} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>
			 </CSSTransition>
			))
	   return <div className="starredNotes"> <h5>Starred Notes</h5> {starredNotes} </div>
}

export default StarredNotes;


