import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/NavBar/navbar';
import TagBar from './components/NavBar/tagbar';
import NotesContainer from './components/NotesContainer/notescontainer';
import CurrentNoteBox from './components/CurrentNoteBox/currentNoteBox';

import { arraySort } from './helpers/helpers';
import './sass/styles.scss';

class App extends Component {
    static defaultProps = {
        notes: [],
        active: {},
    }

    static propTypes = {
        notes: PropTypes.arrayOf(PropTypes.object),
        active: PropTypes.shape({
            activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
            activeNote: PropTypes.number,
        }),
    }

    state = {
        searchResults: [],
        searching: false,
    }

    searchNotes = (value) => {
        let searchResults = [];
        const { notes } = this.props;
        const regex = new RegExp(`${value}`, 'i');
        searchResults = notes.filter(curr => regex.test(curr.content) || regex.test(curr.name));
        this.setState({ searchResults, searching: true });
    }

    stopSearch = () => this.setState({ searchResults: [], searching: false })

    render() {
        const { searching, searchResults } = this.state;
        const { active, notes } = this.props;
        let displayedNotes;
        if (searching) {
            displayedNotes = searchResults;
        } else if (!searching && active.activeTag.value !== 'allNotes') {
            displayedNotes = notes.filter(note => note.tags.value === active.activeTag.value);
        } else {
            displayedNotes = notes;
        }
        const responsiveNoteBox = active.activeNote > 0
            ? 'full-view currentNoteBox'
            : 'narrow-view currentNoteBox';
        const responsiveNotesContainer = active.activeNote > 0
            ? 'narrow-view notesContainer'
            : 'full-view notesContainer';
        return (
            <div className="main">
                <div className="left">
                    <Navbar searchNotes={this.searchNotes} />
                    <TagBar stopSearch={this.stopSearch} />
                    <NotesContainer
                      notes={displayedNotes}
                      responsiveClassName={responsiveNotesContainer}
                    />
                </div>
                <CurrentNoteBox responsiveClassName={responsiveNoteBox} />
            </div>
        );
    }
}

export default connect(
    state => ({
        notes: arraySort(state.notes),
        active: state.active,
    }),
)(App);
