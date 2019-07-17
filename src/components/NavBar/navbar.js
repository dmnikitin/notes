import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { today } from '../../helpers/helpers';
import { addNote, makeNoteActive } from '../../store/ac';

let location;

/* globals document fetch */

class Navbar extends React.Component {
    static propTypes = {
        searchNotes: PropTypes.func.isRequired,
        onAddNote: PropTypes.func.isRequired,
        onToggleDisplay: PropTypes.func.isRequired,
    }

    state = { clicked: false }

    componentDidMount() {
        const fetchRequest = () => {
            const url = 'http://ip-api.com/json';
            const getLocation = (value) => {
                location = `${value.city}, ${value.country}`;
            };
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('failed');
                }, networkError => console.log(networkError.message))
                .then(jsonResponse => getLocation(jsonResponse));
        };
        fetchRequest();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClickOutside)

    addNoteHandler = () => {
        const { onAddNote, onToggleDisplay } = this.props;
        const newNote = {
            name: 'Default note name',
            content: 'Default note content',
            priority: false,
            location,
            date: today,
            index: Date.now(),
            tags: {
                value: '',
                label: '',
            },
        };
        onAddNote(newNote);
        onToggleDisplay(newNote.index);
    }

    findNotes = (e) => {
        const { searchNotes } = this.props;
        searchNotes(e.target.value);
    }

    focused = () => setTimeout(() => this.setState({ clicked: true }), 0)

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            setTimeout(() => this.setState({ clicked: false }), 0);
        }
    }

    setWrapperRef = (node) => { this.wrapperRef = node; }

    render() {
        const { clicked } = this.state;
        const searchButton = !clicked
            ? (
                <CSSTransition timeout={300} classNames="fade">
                    <div className="fa fa-search" onClick={this.focused} />
                </CSSTransition>
            )
            : null;
        const searchForm = !clicked ? 'full-form' : 'clicked-form';

        return (
            <div className="navbar">
                <div className="search-container">
                    <form action="" className={searchForm}>
                        <TransitionGroup className="search-button">
                            {searchButton}
                        </TransitionGroup>
                        <input type="text" placeholder="Search.." ref={this.setWrapperRef} onChange={this.findNotes} onClick={this.focused} />
                    </form>
                </div>
                <div id="addnote" className="fa fa-plus" onClick={this.addNoteHandler} />
            </div>
        );
    }
}

export default connect(
    null,
    dispatch => ({
        onAddNote: note => dispatch(addNote(note)),
        onToggleDisplay: noteIndex => dispatch(makeNoteActive(noteIndex)),
    }),
)(Navbar);
