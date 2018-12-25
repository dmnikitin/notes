import React from 'react';
import PropTypes from 'prop-types';
import { notePreviewDate } from '../../../helpers/helpers.js';

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
        toggleDisplay: PropTypes.func

    }
       
    displayNote = () => this.props.toggleDisplay(this.props.currentNote.index)

    render() {
        let priorityBorder;
        this.props.currentNote.priority === true ? priorityBorder = { "borderLeft": "5px solid gold" } : null;
        let thisMonth = notePreviewDate(this.props.currentNote.date, "month");
        let thisDay = notePreviewDate(this.props.currentNote.date, "day");
        let thisYear = notePreviewDate(this.props.currentNote.date, "year");

        return (
 
           <li className="notePreview" onClick={this.displayNote} style={priorityBorder}>
                <div className="metaPreview" > 
                    <span className="datePreviewMax">
                        <h2>{thisDay}</h2>
                        <h3>{thisMonth}</h3>
                        <h4>{thisYear}</h4>
                    </span>
                </div>
                <div className="noteContentPreview">
                    <h2>{this.props.currentNote.name}</h2>
                    <p>{this.props.currentNote.content}</p>
                </div>
            </li>

        )
    }
}