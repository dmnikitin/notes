import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/NavBar/navbar.js';
import TagBar from './components/NavBar/tagbar.js';
import NotesContainer from './components/NotesContainer/notescontainer.js';
import CurrentNoteBox from './components/CurrentNoteBox/currentNoteBox.js';
import { arraySort } from './helpers/helpers.js';
import './sass/styles.scss';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const parsed = JSON.parse(localStorage["notes"] || '{}');
const notesArray = [];
for (var i in parsed) {
    notesArray.push(parsed[i])
};

const parsedTags = JSON.parse(localStorage["notes-tags"] || '{}');
const tagsArray = [];
for (var i in parsedTags) {
    tagsArray.push(parsedTags[i])
};

(notesArray.length === 0) ? notesArray.push({ name: "cofveve", date: "31.12.2018", priority: false, location: "Minsk, Belarus", content: "infamous Trump's tweet", index: 112001 }): null;
(tagsArray.length === 0) ? tagsArray.push( {value: "important", label: "Important"}, {value: "personal", label: "Personal"}): null;


class App extends React.Component {

    state = { 
    	notes: notesArray,
    	activeNote: -1,
    	tags: tagsArray,
    	activeTag: "allNotes",
		searchResults: [],
		searching: false	
	}

    componentWillMount = () => {
        const modified = this.state.notes;
        arraySort(modified);
       /////////
        let data = +localStorage.getItem("notes-active");
        console.log(typeof data)
        this.setState({ notes: modified, activeNote: data });
		////////
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
      
    }
   
    searchNotes = (value) => {
		let searchResults=[];
        const allNotes = this.state.notes;
		const regex = new RegExp(`${value}`, 'i')
		searchResults = allNotes.filter(curr => regex.test(curr.content) || regex.test(curr.name) )
	    this.setState({searchResults, searching: true}) 
	}
	
	changeNotesList = (callback, value, noteIndex) => {
        const modified = this.state.notes;
		const thisNote = this.state.notes.findIndex((e) => e.index === noteIndex);
        this[`${callback}`](modified, value, thisNote)
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
	
	toggleDisplay = (noteIndex) => {
		this.setState({activeNote: noteIndex})
		localStorage.setItem("notes-active", JSON.stringify(noteIndex))
	}

	toggleTagView = (tag) => this.setState({ activeTag: tag})
	
	addTag = (tag) => {
		if (this.state.tags.every( (i) => i.value !== tag.value)) { 
			this.setState({ tags: [...this.state.tags, tag] });
			localStorage.setItem("notes-tags", JSON.stringify([...this.state.tags, tag]))
		} else { console.log("used tag ma man")}
	}
	
    addNote = (array, value, noteIndex) => array.push(value)
    removeNote = (array, value, noteIndex) => array.splice(noteIndex, 1)
    changeNote = (array, value, noteIndex) => array.splice(noteIndex, 1, value)

    render() {
		
		let displayedNotes;
		displayedNotes = (this.state.searching) ? this.state.searchResults : this.state.activeTag !== "allNotes" ? this.state.notes.filter( (note) => note.tags === this.state.activeTag) : this.state.notes		
       
        return (
            <div className="main"> 
      			<div className="left">
					<Navbar  
						notes={this.state.notes} 
						changeNotesList={this.changeNotesList}  
						toggleDisplay={this.toggleDisplay}
						searchNotes={this.searchNotes}/>
					<TagBar 
						tags={this.state.tags}
						toggleTagView={this.toggleTagView}/>	
					<NotesContainer 
						notes={displayedNotes}
						activeTag={this.state.activeTag}
						changeNotesList={this.changeNotesList} 
						toggleDisplay={this.toggleDisplay}/>
				</div>
				<CurrentNoteBox 
						notes={displayedNotes}
						tags={this.state.tags} 
						addTag={this.addTag}
						changeNotesList={this.changeNotesList} 
						toggleDisplay={this.toggleDisplay}
						activeNote={this.state.activeNote}/>
       		</div>
        )
    }
}

render(<App />, document.getElementById('app'));