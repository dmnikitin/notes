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
    
    state = { displayedContent: ""}

    componentWillMount = () => {
        const displayed = this.markdownToNormal();
        this.setState({ displayedContent: displayed })
       
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.currentNote.content !== this.state.displayedContent) {
        const displayed = this.markdownToNormal();
        this.setState({ displayedContent: displayed })
     }
    }

    markdownToNormal = () => {
        const thisNote = this.props.currentNote;
        const markdown = /(<\/?strong?[^>]*>)|(<\/?i[^>]*>)|(<\/?u[^>]*>)|(<\/?div[^>]*>)|(<\/?strong[^>]*>)|(<\/?b[^>]*>)/g;
        const html = thisNote.content.replace(markdown, '');            
        return html
    }
       
    displayNote = () => this.props.toggleDisplay(this.props.currentNote.index)

    render() {
        let priorityBorder, tags;
        let thisMonth = notePreviewDate(this.props.currentNote.date, "month");
        let thisDay = notePreviewDate(this.props.currentNote.date, "day");
        let thisYear = notePreviewDate(this.props.currentNote.date, "year");
        this.props.currentNote.priority ? priorityBorder = { "borderLeft": "5px solid gold" } : null;
        this.props.currentNote.tags ? tags = <h5>tags: {this.props.currentNote.tags.value}</h5> : tags = <h5>tags: none</h5>

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
                    <p>{this.state.displayedContent}</p>
                    {tags}
                </div>
            </li>

        )
    }
}