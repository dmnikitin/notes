
import React from 'react';
import { today } from '../../../../helpers/helpers.js';
import CreatableSelect  from 'react-select/lib/Creatable';
import customStyles from '../../../../sass/selectstyles.js';

export default class ToolbarMeta extends React.Component {
    
    priorityChange = () => {
        const change = this.props.currentNote
        change.priority = !this.props.currentNote.priority;
        change.edited = today;
        this.props.changeNotesList('changeNote', change, change.index);
    }
  
    handleChange = (newValue, actionMeta) => {
        this.props.addTag(newValue);
        const change = this.props.currentNote
        change.tags = newValue;
        change.edited = today;
        this.props.changeNotesList('changeNote', change, change.index);
    }

    deleteNote = () => this.props.changeNotesList('removeNote', null, this.props.currentNote.index)
	
    render() {
		let prioritySpan, placeholder;
    	this.props.currentNote.priority ? prioritySpan = <button onClick={this.priorityChange}><span className="fa fa-star" > Mark as non-important </span></button> : prioritySpan = <button onClick={this.priorityChange}> <span className="fa fa-star-o" > Mark as important </span></button>
        this.props.currentNote.tags ? placeholder = <h4>tags: {this.props.currentNote.tags.value}</h4> : placeholder = <h4>select a tag</h4>
        return (
            <div className="toolbarMeta">
			    {prioritySpan}
                <button onClick={this.deleteNote}>
                    <span className="fa fa-trash" > Delete this note </span>
                </button>
                <CreatableSelect  
                    isClearable
                    placeholder={placeholder}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    onChange={this.handleChange}
                    styles={customStyles}
                    options={this.props.tags} />
           	</div>
        )
    }
}

