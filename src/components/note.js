import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar.js';
import ContentEditable from './contentEditable.js';

export default class Note extends React.Component {

    static propTypes = {
        notes: PropTypes.array,
        currentNote: PropTypes.shape({
            name: PropTypes.string,
            display: PropTypes.bool,
            content: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number
        }),
        changeNotesList: PropTypes.func.isRequired,
        toggleDisplay: PropTypes.func

    }

    state = {
    	html: this.props.currentNote.content
    }

    handleChange = (e) => {

        let { notes, currentNote, changeNotesList } = this.props;
        const thisNote = notes.findIndex((e) => e.index === currentNote.index);
        let change = currentNote;
        console.log(e.target.innerHTML)
        e.target.className === "note-name" ? change.name = e.target.value : change.content = e.target.value;
        changeNotesList('changeNote', change, thisNote);

    }

    handleHTML = (e) => {

    	this.setState({html: e.target.value});
    	console.log(this.state)

    	let { notes, currentNote, changeNotesList } = this.props;
        const thisNote = notes.findIndex((e) => e.index === currentNote.index);
        let change = currentNote;
        change.content = e.target.value;
        changeNotesList('changeNote', change, thisNote);


    }

    render() {

        return (
            <div className="note"> 
            	<Toolbar content={this.props.currentNote.content}/>
			    <h2 className="note-date">{this.props.currentNote.date}</h2>
			    <h2 className="note-location">{this.props.currentNote.location}</h2>
			    <textarea className="note-name" onChange={this.handleChange} value={this.props.currentNote.name}>  </textarea>
   				
   				<ContentEditable html={this.props.currentNote.content} onChange={this.handleHTML} content={this.props.currentNote.content}/>

   				
   			</div>
        )
    }
}