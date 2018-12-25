import React from 'react';
import PropTypes from 'prop-types';
import ToolbarMeta from './ToolbarMeta/toolbarMeta.js';
import ToolbarMarkdown from './ToolbarMarkdown/toolbarMarkdown.js'
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
    	html: this.props.currentNote.content,
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

    getMarkdownText = () => {

    }

    

    render() {

        return (
               
            <div className="note"> 
            
             
                    <ToolbarMeta currentNote={this.props.currentNote} changeNotesList={this.props.changeNotesList}/>
    			  
                    <textarea className="note-name" onChange={()=>this.handleChange(event, "name")} value={this.props.currentNote.name}>  </textarea>
       				<ContentEditable currentNote={this.props.currentNote} html={this.props.currentNote.content} onChange={this.handleChange}/>
    	            <ToolbarMarkdown currentNote={this.props.currentNote} changeNotesList={this.props.changeNotesList}/>
              
              
            </div>

        )
    }
}