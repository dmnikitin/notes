import React from 'react';
import PropTypes from 'prop-types';
import { today } from '../../helpers/helpers.js';

let location;

export default class Navbar extends React.Component {

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
        const newNote = { name: "Default note name", content: "Default note content", priority: false, location: location, date: today, index: Date.now() };
        this.props.changeNotesList('addNote', newNote, null);
        this.props.toggleDisplay(newNote.index)
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

