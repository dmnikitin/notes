import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolbarMeta from './ToolbarMeta/toolbarMeta.js';
import ToolbarMarkdown from './ToolbarMarkdown/toolbarMarkdown.js';
import NoteInfoBar from './NoteInfoBar/noteinfobar.js';
import ContentEditable from './contentEditable.js';
import { today } from '../../../helpers/helpers.js';
import { changeNote } from '../../../store/ac.js'; 

class Note extends React.Component {

   static propTypes = {
        notes: PropTypes.array,
        currentNote: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.string,
            edited: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number
        }),      
        onChangeNote: PropTypes.func
    }

    state = { name: "", content: "" }

    componentWillMount = () => this.setState({ name: this.props.currentNote.name, content: this.props.currentNote.content })
    
    handleChange = (e, index) => {
        const {notes, currentNote} = this.props;
        const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
		let change = currentNote;	
		if (index === "name") {
		    this.setState({name: e.data});
            change.name = e.data;
        } 
		else if (index === "content") {
			this.setState({content: e.data});
			change.content = e.data;
		}  
        change.edited = today;        
        this.props.onChangeNote(change, notePositionInStoreArray);
    }

    render() {       
        return (               
            <div className="note">                
                <ToolbarMeta currentNote={this.props.currentNote} />
    			<div className="note-name"><ContentEditable edited="name" currentNote={this.props.currentNote} html={this.props.currentNote.name} onChange={this.handleChange}/></div>
   				<div className="note-content"><ContentEditable edited="content" currentNote={this.props.currentNote} html={this.props.currentNote.content  } onChange={this.handleChange}/></div>
	            <ToolbarMarkdown currentNote={this.props.currentNote} />
                <NoteInfoBar currentNote={this.props.currentNote} />
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
        onChangeNote: (value, noteIndex) => {
            dispatch(changeNote(value, noteIndex))
    }})
)(Note);