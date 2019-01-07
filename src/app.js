import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './components/NavBar/navbar.js';
import TagBar from './components/NavBar/tagbar.js';
import NotesContainer from './components/NotesContainer/notescontainer.js';
import CurrentNoteBox from './components/CurrentNoteBox/currentNoteBox.js';
import { arraySort } from './helpers/helpers.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import './sass/styles.scss';

class App extends Component {

    static propTypes = {
        notes: PropTypes.array,
        tags: PropTypes.array,
        active: PropTypes.shape({
            activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string}),
            activeNote: PropTypes.number           
        })
    }

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
		let displayedNotes, responsiveNotesContainer, responsiveNoteBox;		
		displayedNotes = (this.state.searching) ? this.state.searchResults : this.props.active.activeTag.value !== "allNotes" 
		? this.props.notes.filter( note =>  note.tags.value === this.props.active.activeTag.value) : this.props.notes		
		this.props.active.activeNote > 0 ? responsiveNoteBox="full-view currentNoteBox" : responsiveNoteBox = "narrow-view currentNoteBox";
       	this.props.active.activeNote > 0 ? responsiveNotesContainer ="narrow-view notesContainer" : responsiveNotesContainer = "full-view notesContainer";      

        return (        	
	            <div className="main"> 
	      			<div className="left">
						<Navbar searchNotes={this.searchNotes}/>
						<TagBar />
						<NotesContainer notes={displayedNotes} responsiveClassName={responsiveNotesContainer}/>						
					</div>
					<CurrentNoteBox responsiveClassName={responsiveNoteBox}/>
	       		</div>      		
        )
    }
}

export default connect( state => {return { notes: arraySort(state.notes), tags: state.tags, active: state.active }})(App)