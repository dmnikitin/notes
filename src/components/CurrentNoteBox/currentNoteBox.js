import React from 'react';
import Note from './Note/note.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { makeNoteActive, deactive } from '../../store/ac.js'; 

 const CurrentNoteBox = ({ notes, active }) => {
	let note;
	const thisNote = notes.findIndex((e) => e.index === active.activeNote);
	if (active.activeNote === -1) { note = <h1></h1>}
	else {	note =  <CSSTransition timeout={500} classNames="fade">
						<Note key={thisNote} currentNote={notes[thisNote]} />
				    </CSSTransition>
		} 
    return (
       <TransitionGroup className="currentNoteBox">
            {note}
        </TransitionGroup>
    )	
}

export default connect(
    state => {
        return {
            notes: state.notes,
            active: state.active
    }}

)(CurrentNoteBox);



				// if (active.activeNote === -1) { note = <h1></h1>}
    //     else if (active.activeNote !== -1 && notes[thisNote]) {
    //         note =  <CSSTransition timeout={500} classNames="fade">
    //                     <Note key={thisNote} currentNote={notes[thisNote]} />
    //                 </CSSTransition>
    //     } else {note = <h1> Press on existing note or make a new by clickin on add button! </h1>}