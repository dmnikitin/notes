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


    state = { notes: array }

    componentWillMount() {
        //!!!!!!!!
        //const modified = {...this.state.notes}
        const modified = this.state.notes;
        arraySort(modified);

        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }

    changeNotesList = (callback, value, noteIndex) => {
        const modified = this.state.notes;
        this[`${callback}`](modified, value, noteIndex)
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));


    }

    findNote = (value) => {

        let searchResults;

        //flash content
        const allNotes = this.state.notes;
        allNotes.forEach(function(curr) {
            if (curr.content.search(value) !== -1 || curr.name.search(value) !== -1) {
                searchResults.push(curr)
            }

            // set state : searchresults
            // cross adevent listener searchresults=""


        })
    }


    toggleDisplay = (noteIndex) => {
        const modified = this.state.notes;

        modified.forEach(function(item) {
            item["display"] = false
        });
        modified[noteIndex].display = true;
        this.setState({ notes: modified });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }

    addNote = (array, value, noteIndex) => array.push(value)

    removeNote = (array, value, noteIndex) => {
        console.log(noteIndex)
        array.splice(noteIndex, 1);
    }

    changeNote = (array, value, noteIndex) => array.splice(noteIndex, 1, value)

    render() {

        let note;
        const thisNote = this.state.notes.findIndex((e) => e.display === true);

        if (thisNote !== -1) { note = <Note currentNote={this.state.notes[thisNote]} notes={this.state.notes} changeNotesList={this.changeNotesList} toggleDisplay={this.toggleDisplay}/> } else { note = null }

        return (
            <div className="main"> 
      			<div className="left">
					<Navbar notes={this.state.notes} changeNotesList={this.changeNotesList}  toggleDisplay={this.toggleDisplay}/>
					<NotesContainer notes={this.state.notes} changeNotesList={this.changeNotesList} toggleDisplay={this.toggleDisplay}/>
				
      			</div>
      			<div className="right">
					{note}
      			</div>
       		</div>

        )

    }
}



render(<App />, document.getElementById('app'));