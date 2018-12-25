import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/NavBar/navbar.js';
import NotesContainer from './components/NotesContainer/notescontainer.js';
import CurrentNoteBox from './components/CurrentNoteBox/currentNoteBox.js';
import { arraySort } from './helpers/helpers.js';
import './sass/styles.scss';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const parsed = JSON.parse(localStorage["notes"] || '{}');
const array = [];
for (var i in parsed) {
    array.push(parsed[i])
};

(array.length === 0) ? array.push({ name: "cofveve", date: "31.12.2018", priority: false, location: "Minsk, Belarus", content: "infamous Trump's tweet", index: "01" }): null;


class App extends React.Component {

    state = { 
    	notes: array,
    	activeNote: -1,
		searchResults: []	
	}

    componentWillMount() {
        const modified = this.state.notes;
        arraySort(modified);
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }

    searchNotes = (value) => {
		let searchResults=[];
        const allNotes = this.state.notes;
		const regex = new RegExp(`${value}`, 'i')
		searchResults = allNotes.filter(curr => regex.test(curr.content) || regex.test(curr.name) )
	    this.setState({searchResults}) 
	}
	
	changeNotesList = (callback, value, noteIndex) => {
        const modified = this.state.notes;
		const thisNote = this.state.notes.findIndex((e) => e.index === noteIndex);
        this[`${callback}`](modified, value, thisNote)
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
	
	toggleDisplay = (noteIndex) => this.setState({activeNote: noteIndex})
	// bug with displayedNote .. {activeNote: this.state.activeNote === noteIndex ? -1 : noteIndex}
	
    addNote = (array, value, noteIndex) => array.push(value)
    removeNote = (array, value, noteIndex) => array.splice(noteIndex, 1)
    changeNote = (array, value, noteIndex) => array.splice(noteIndex, 1, value)

    render() {
		
		let displayedNotes;
		displayedNotes = (this.state.searchResults.length === 0) ? this.state.notes : this.state.searchResults		
       
        return (
            <div className="main"> 
      			<div className="left">
					<Navbar 
						notes={this.state.notes} 
						changeNotesList={this.changeNotesList}  
						searchNotes={this.searchNotes}
						toggleDisplay={this.toggleDisplay}/>
					<NotesContainer 
						notes={displayedNotes} 
						changeNotesList={this.changeNotesList} 
						toggleDisplay={this.toggleDisplay}/>
				</div>
				<CurrentNoteBox 
						notes={displayedNotes} 
						activeNote={this.state.activeNote}
						changeNotesList={this.changeNotesList} 
						toggleDisplay={this.toggleDisplay}
					/>
       		</div>
        )
    }
}

render(<App />, document.getElementById('app'));