import React from 'react';
import PropTypes from 'prop-types';
import { notePreviewDate } from '../helpers/helpers.js';

export default class NotePreview extends React.Component {

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
        changeNotesList: PropTypes.func,
        toggleDisplay: PropTypes.func

    }

    state = { 
        isHovering: false 
    }

    deleteNote = () => this.props.changeNotesList('removeNote', null, this.props.currentNote.index)
    
    priorityChange = () => {
        const change = this.props.currentNote
        change.priority = !this.props.currentNote.priority;
        this.props.changeNotesList('changeNote', change, change.index);
        this.displayNote()
    }

    displayNote = () => this.props.toggleDisplay(this.props.currentNote.index)
    
    handleMouseHover = () => this.setState(this.toggleHoverState)

    toggleHoverState = (state) => { return { isHovering: !state.isHovering } }

    render() {
        let prioritySpan, priorityBorder;
        this.props.currentNote.priority === true ? prioritySpan = <span className="fa fa-star" onClick={this.priorityChange}></span> : prioritySpan = <span className="fa fa-star-o" onClick={this.priorityChange}></span>
        this.props.currentNote.priority === true ? priorityBorder = { "borderLeft": "3px solid red" } : null;
        let thisMonth = notePreviewDate(this.props.currentNote.date, "month");
        let thisDay = notePreviewDate(this.props.currentNote.date, "day");
        let thisYear = notePreviewDate(this.props.currentNote.date, "year");

        return (

            <li className="notePreview" onClick={this.displayNote} onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}>

          {
          	!this.state.isHovering &&

       			<div className="metaPreview" style={priorityBorder}> 
	       			<span className="datePreviewMax">
						<h2>{thisDay}</h2>
						<h3>{thisMonth}</h3>
						<h4>{thisYear}</h4>
					</span>
	       		</div>
			}
		  {
			this.state.isHovering &&
				<div className="metaPreviewHover" > 
	       			 <span className="fa fa-trash-o" onClick={this.deleteNote}></span>
	       			 {prioritySpan}
				</div>
			}
	       		<div className="noteContentPreview">
		         	<h2>{this.props.currentNote.name}</h2>
		         	<p>{this.props.currentNote.content}</p>
		         </div>
     		</li>

        )
    }
}