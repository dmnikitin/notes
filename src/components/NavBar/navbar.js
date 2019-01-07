import React from 'react';
import PropTypes from 'prop-types';
import { today } from '../../helpers/helpers.js';
import { connect } from 'react-redux';
import {addNote, makeNoteActive } from '../../store/ac.js'; 

import { CSSTransition, TransitionGroup } from 'react-transition-group';


let location;

class Navbar extends React.Component {

    static propTypes = {                
        searchNotes: PropTypes.func,   
        notes: PropTypes.array,
        onAddNote:  PropTypes.func,
        onToggleDisplay:  PropTypes.func
    }

    state = { clicked: false }
   
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
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount = () => document.removeEventListener('mousedown', this.handleClickOutside)
   
    addNote = () => {
        const newNote = { name: "Default note name", content: "Default note content", priority: false, location: location, date: today, index: Date.now(), tags: {value: "", label: ""} };
        this.props.onAddNote(newNote)
        this.props.onToggleDisplay(newNote.index)
    }

    findNotes = (e) => this.props.searchNotes(e.target.value)
    
    focused = () => setTimeout( () => this.setState({ clicked: true }) , 0)

    handleClickOutside = (event)  => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            setTimeout( () => this.setState({ clicked: false }) , 0)
        }
      }

    setWrapperRef = (node) => this.wrapperRef = node

    render() {
        let searchButton, searchForm; 
        searchButton =  !this.state.clicked ? <CSSTransition timeout={300} classNames="fade">
                       <span  className="fa fa-search" onClick={this.focused}></span> 
                    </CSSTransition> : null
        searchForm = !this.state.clicked ? "full-form" : "clicked-form";

        return (
            <div className="navbar"> 
				<div className="search-container" >
                	<form action="" className={searchForm} >
                        <TransitionGroup className="search-button"> {searchButton}</TransitionGroup>
                        <input type="text"   placeholder="Search.." ref={this.setWrapperRef} onChange={this.findNotes} onClick={this.focused}/>
				    </form>
    			</div>                               
				<span id="addnote" className="fa fa-plus" onClick={this.addNote}></span>
			</div>
        )
    }
}

export default connect(
    state => {
        return {
            notes: state.notes
    }},
    dispatch => ({
        onAddNote: (note) => { 
            dispatch(addNote(note))
        },
        onToggleDisplay: (noteIndex) => {
            dispatch(makeNoteActive(noteIndex))
        }
    })
)(Navbar);

