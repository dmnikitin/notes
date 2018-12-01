import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/navbar.js';
import NotesContainer from './components/notescontainer.js';
import Note from './components/note.js';
import { arraySort } from './helpers/helpers.js';
import './styles.scss';

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
        allNotes.forEach(function(curr) {

            if (curr.content.search(value) !== -1 || curr.name.search(value) !== -1) {
                searchResults.push(curr)
            } 
		    
            
            // cross adevent listener searchresults=""
 			//flash content
 			// componentn unmount - clear state

        })
        console.log("searchResults" , searchResults )
        console.log("state1 ", this.state.searchResults) 
		this.setState({ searchResults: searchResults}) 
		console.log("state2 ", this.state.searchResults) 
        
    }


    toggleDisplay = (noteIndex) =>     
        this.setState(function(prevState){
      		return {activeNote: prevState.activeNote === noteIndex ? -1 : noteIndex}
   			})

	changeNotesList = (callback, value, noteIndex) => {
        const modified = this.state.notes;
		const thisNote = this.state.notes.findIndex((e) => e.index === noteIndex);
        this[`${callback}`](modified, value, thisNote)
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }

    addNote = (array, value, noteIndex) => array.push(value)
    removeNote = (array, value, noteIndex) => array.splice(noteIndex, 1)
    changeNote = (array, value, noteIndex) => array.splice(noteIndex, 1, value)

    render() {

        let note;
        const thisNote = this.state.notes.findIndex((e) => e.index === this.state.activeNote);
		this.state.activeNote !== -1 ? note = <Note currentNote={this.state.notes[thisNote]} notes={this.state.notes} changeNotesList={this.changeNotesList} toggleDisplay={this.toggleDisplay}/>  : note = <h1> Press on existing note or make a new by clickin on add button! </h1>; 

        return (
            <div className="main"> 
      			<div className="left">
					<Navbar 
						notes={this.state.notes} 
						changeNotesList={this.changeNotesList}  
						searchNotes={this.searchNotes}/>
					<NotesContainer 
						notes={this.state.notes} 
						changeNotesList={this.changeNotesList} 
						toggleDisplay={this.toggleDisplay}/>
				
      			</div>
      			<div className="right">
					{note}
      			</div>
       		</div>

        )

    }
}



render(<App />, document.getElementById('app'));