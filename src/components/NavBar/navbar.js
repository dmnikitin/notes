import React from 'react';
import PropTypes from 'prop-types';
import { today } from '../../helpers/helpers.js';
import { connect } from 'react-redux';

import {addNote, makeNoteActive } from '../../store/ac.js'; 

let location;

class Navbar extends React.Component {

    static propTypes = {
        notes: PropTypes.array,
        changeNotesList: PropTypes.func,
        searchNotes: PropTypes.func
    }
   
    componentDidMount() {

        const fetchRequest = () => {
            const url = "http://ip-api.com/json";
            const getLocation = (value) => {
                location = `${value.city}, ${value.country}`
            }
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('failed')
                }, networkError => console.log(networkError.message))
                .then(jsonResponse => {
                    getLocation(jsonResponse)
                })
        }
        fetchRequest();
    }

    addNote = () => {
        const newNote = { name: "Default note name", content: "Default note content", priority: false, location: location, date: today, index: Date.now(), tags: {value: "", label: ""} };
        this.props.onAddNote(newNote)
        this.props.onToggleDisplay(newNote.index)
    }

    findNotes = (e) => this.props.searchNotes(e.target.value)

    render() {
        return (
            <div className="navbar"> 
				<div className="search-container">
					<form action="" id="searchbar">
						<span  className="fa fa-search" ></span>
                        <input type="text"   placeholder="Search.." name="search" onChange={this.findNotes}/>
					</form>
				</div>                               
				<span id="addnote" className="fa fa-pencil" onClick={this.addNote}></span>
			</div>
        )
    }
}

export default connect(
    state => {
        return {
            notes: state.notes
    }}
,
    dispatch => ({
        onAddNote: (note) => { 
            dispatch(addNote(note))
        },
        onToggleDisplay: (noteIndex) => {
            dispatch(makeNoteActive(noteIndex))
        }
    })
)(Navbar);