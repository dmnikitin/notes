import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NotePreview from './NotePreview/notepreview';

const NotesContainer = ({ notes, responsiveClassName }) => {
    const notesArray = notes.map(item => (
        <CSSTransition key={item.index} timeout={300} classNames="fade">
          <NotePreview notes={notes} currentNote={item} />
        </CSSTransition>
    ));
    return (
        <TransitionGroup className={responsiveClassName}>
          {notesArray}
        </TransitionGroup>
    );
};

NotesContainer.defaultProps = {
    notes: [],
};


NotesContainer.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    responsiveClassName: PropTypes.string.isRequired,
};

export default NotesContainer;
