import React, { Component } from 'react';
import Navbar from './components/NavBar/navbar.js';
import TagBar from './components/NavBar/tagbar.js';
import NotesContainer from './components/NotesContainer/notescontainer.js';
import CurrentNoteBox from './components/CurrentNoteBox/currentNoteBox.js';
import { arraySort } from './helpers/helpers.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import './sass/styles.scss';

class App extends Component {

    state = { 
     	searchResults: [],
		searching: false				
	}
   
    searchNotes = (value) => {
		let searchResults=[];
        const allNotes = this.props.notes;
		const regex = new RegExp(`${value}`, 'i')
		searchResults = allNotes.filter(curr => regex.test(curr.content) || regex.test(curr.name) )
	    this.setState({searchResults, searching: true}) 
	}
				
    render() {
		let displayedNotes;		
		displayedNotes = (this.state.searching) ? this.state.searchResults : this.props.active.activeTag.value !== "allNotes" ? this.props.notes.filter( 
			(note) => typeof note.tags === 'object' && note.tags.value === this.props.active.activeTag.value) : this.props.notes		
       	console.log(this.props.active.activeTag)
        return (
        	
	            <div className="main"> 
	      			<div className="left">
						<Navbar searchNotes={this.searchNotes}/>
						<TagBar />
						<NotesContainer notes={displayedNotes}/>						
					</div>
					<CurrentNoteBox />
	       		</div>      		
        )
    }
}

export default connect( state => {return { notes: arraySort(state.notes), tags: state.tags, active: state.active }})(App)