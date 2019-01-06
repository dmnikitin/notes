import React from 'react';
import PropTypes from 'prop-types';
import NotePreview from './NotePreview/notepreview.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const NotesContainer = ({ notes }) => {

    let notesArray = notes.map(item => (        
        <CSSTransition  key={item.index} timeout={300} classNames="fade">
          <NotePreview  notes={notes} currentNote={item} />
        </CSSTransition> )); 
        return (
        <TransitionGroup className="notesContainer">
          {notesArray}
        </TransitionGroup>
    )
}

NotesContainer.propTypes = {
    notes: PropTypes.array,
      
}


export default NotesContainer;