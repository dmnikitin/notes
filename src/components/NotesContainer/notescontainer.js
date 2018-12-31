import React from 'react';
import PropTypes from 'prop-types';
import NotePreview from './NotePreview/notepreview.js';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';


const NotesContainer = ({ notes, activeTag, changeNotesList, toggleDisplay }) => {

    let notesArray = notes.map(item => (
        <CSSTransition  key={item.index} timeout={300} classNames="fade">
          <NotePreview  notes={notes} currentNote={item} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>
        </CSSTransition> )); 
    return (
        <TransitionGroup className="notesContainer">
          {notesArray}
        </TransitionGroup>
    )
}

NotesContainer.propTypes = {
    notes: PropTypes.array,
    changeNotesList: PropTypes.func,
    toggleDisplay: PropTypes.func
}

export default NotesContainer;