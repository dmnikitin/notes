import React from 'react';
import PropTypes from 'prop-types';
import { today } from '../helpers/helpers.js';

let location;
const url = "http://ip-api.com/json";
const getLocation = (value) => {
    location = `${value.city}, ${value.country}`
}



// component will mount 

const fetchRequest = () => {
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

export default class Navbar extends React.Component {

    //findnotes

    static propTypes = {
        notes: PropTypes.array,
        changeNotesList: PropTypes.func,
        toggleDisplay: PropTypes.func

    }

    addNote = () => {
        const newNote = { name: "Default note name", display: true, content: "Default note content", priority: false, location: location, date: today, index: Date.now() };
        this.props.changeNotesList('addNote', newNote, null);
    }

    render() {



        return (
            <div className="navbar"> 
				<div className="search-container">
					<form action="">
						<input type="text" id="searchbar"  placeholder="Search.." name="search"/>
					</form>
				</div>
				<span id="addnote" className="fa fa-pencil-square-o" onClick={this.addNote}></span>
			</div>
        )
    }
}