import React from 'react';
import PropTypes from 'prop-types';
import NotePreview from './NotePreview/notepreview.js';
import StarredNotes from './starrednotes.js';
import OtherNotes from './othernotes.js'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';


const NotesContainer = ({ notes, changeNotesList, toggleDisplay }) => {

 
    

    return (
        <TransitionGroup className="notesContainer">
            <StarredNotes  notes={notes} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>
            <OtherNotes  notes={notes} changeNotesList={changeNotesList} toggleDisplay={toggleDisplay}/>
        </TransitionGroup>
    )
}


NotesContainer.propTypes = {
    notes: PropTypes.array,
    changeNotesList: PropTypes.func,
    toggleDisplay: PropTypes.func

}

export default NotesContainer;