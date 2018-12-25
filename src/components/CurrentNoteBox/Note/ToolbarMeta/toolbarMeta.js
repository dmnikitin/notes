
import React from 'react';
export default class ToolbarMeta extends React.Component {

    priorityChange = () => {
        const change = this.props.currentNote
        change.priority = !this.props.currentNote.priority;
        this.props.changeNotesList('changeNote', change, change.index);
       
    }

    deleteNote = () => this.props.changeNotesList('removeNote', null, this.props.currentNote.index)
	
    render() {
		let prioritySpan;
    	this.props.currentNote.priority === true ? prioritySpan = <span className="fa fa-star" onClick={this.priorityChange}></span> : prioritySpan = <span className="fa fa-star-o" onClick={this.priorityChange}></span>

        return (
            <div className="toolbarMeta">
			    <h2 className="note-date">{this.props.currentNote.date}</h2>
                <h2 className="note-location">{this.props.currentNote.location}</h2>
                {prioritySpan}
                <span className="fa fa-trash" onClick={this.deleteNote}></span>
			</div>
        )
    }
}

