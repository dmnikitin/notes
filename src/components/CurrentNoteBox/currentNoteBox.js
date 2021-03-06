import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import Note from './Note/note';

const CurrentNoteBox = ({ notes, active, responsiveClassName }) => {
    let note;
    const thisNote = notes.findIndex(e => e.index === active.activeNote);
    if (active.activeNote === -1) {
        note = <h1> </h1>;
    } else if (active.activeNote !== -1 && notes[thisNote]) {
        note = (
            <CSSTransition timeout={1000} classNames="fade">
                <Note key={thisNote} currentNote={notes[thisNote]} />
            </CSSTransition>
        );
    } else {
        note = <h1 style={{ padding: '15px', color: 'grey' }}> Press on existing note or make a new by clickin on add button! </h1>;
    }
    return (
        <TransitionGroup className={responsiveClassName}>
            {note}
        </TransitionGroup>
    );
};

CurrentNoteBox.defaultProps = {
    active: {},
};

CurrentNoteBox.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    active: PropTypes.shape({
        activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
        activeNote: PropTypes.number,
    }),
    responsiveClassName: PropTypes.string.isRequired,
};

export default connect(
    state => ({
        notes: state.notes,
        active: state.active,
    }),
)(CurrentNoteBox);
