import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import Note from './Note/note.js';
import { makeNoteActive, deactive } from '../../store/ac.js'; 

 const CurrentNoteBox = ({ notes, active, responsiveClassName }) => {
	let note;
	const thisNote = notes.findIndex((e) => e.index === active.activeNote);
	if (active.activeNote === -1) { note = <h1></h1>}
    else if (active.activeNote !== -1 && notes[thisNote]) {
            note =  <CSSTransition timeout={1000} classNames="fade">
                        <Note key={thisNote} currentNote={notes[thisNote]} />
                    </CSSTransition>
    } 
    else {note = <h1 style={{"padding": "15px", "color": "grey"}}> Press on existing note or make a new by clickin on add button! </h1>}
    return (
       <TransitionGroup className={responsiveClassName}>
            {note}
        </TransitionGroup>
    )	
}

CurrentNoteBox.propTypes = {
    notes: PropTypes.array,
    active: PropTypes.shape({
        activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string}),
        activeNote: PropTypes.number 
    })      
}

export default connect(
    state => {
        return {
            notes: state.notes,
            active: state.active
    }}

)(CurrentNoteBox);





				