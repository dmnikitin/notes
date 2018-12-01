import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './toolbar.js';
import ContentEditable from './contentEditable.js';

export default class Note extends React.Component {

    static propTypes = {
        notes: PropTypes.array,
        currentNote: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number
        }),
        changeNotesList: PropTypes.func.isRequired,
        
    }

    state = {
    	html: this.props.currentNote.content
    }

    handleChange = (e, index) => {
		let { notes, currentNote, changeNotesList } = this.props;
		let change = currentNote;	
		if (index === "name") {
			change.name = e.target.value} 
		else if (index === "content") {
			this.setState({html: e.data});
			change.content = e.data;
		}  
		changeNotesList('changeNote', change, this.props.currentNote.index);
    }

    render() {

        return (
            <div className="note"> 
            	<Toolbar content={this.props.currentNote.content}/>
			    <h2 className="note-date">{this.props.currentNote.date}</h2>
			    <h2 className="note-location">{this.props.currentNote.location}</h2>
			    <textarea className="note-name" onChange={()=>this.handleChange(event, "name")} value={this.props.currentNote.name}>  </textarea>
   				<ContentEditable html={this.props.currentNote.content} onChange={this.handleChange}/>
	
   			</div>
        )
    }
}