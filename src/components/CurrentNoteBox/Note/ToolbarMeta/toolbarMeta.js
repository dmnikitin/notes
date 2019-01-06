
import React from 'react';
import { today } from '../../../../helpers/helpers.js';
import CreatableSelect  from 'react-select/lib/Creatable';
import customStyles from '../../../../sass/selectstyles.js';
import { connect } from 'react-redux';
import { deleteNote, changeNote, addTag, makeNoteActive } from '../../../../store/ac.js'; 

class ToolbarMeta extends React.Component {
    
    priorityChange = () => {
        const { notes, currentNote, onChangeNote } = this.props;
        const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
        const change = currentNote;
        change.priority = !currentNote.priority;
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
    }
  
    handleTagChange = (newValue) => {
        const { notes, tags, currentNote, onChangeNote, onAddTag } = this.props;
        const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
        const change = currentNote;
        change.tags = newValue;
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
        if (tags.every( (i) => i.value !== newValue.value)) { 
           onAddTag(newValue);
           }
    }

    deleteNote = () => {
        const { notes, currentNote, onDeleteNote } = this.props;
        const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
        onDeleteNote(notePositionInStoreArray)
    }
	
    backToMain = () => this.props.onToggleDisplay(-1)

    render() {
		let prioritySpan, placeholder;
        const { currentNote } = this.props;
    	currentNote.priority ? prioritySpan = <button onClick={this.priorityChange}><span className="fa fa-star">  </span></button> : prioritySpan = <button onClick={this.priorityChange}> <span className="fa fa-star-o" >  </span></button>
        currentNote.tags.value ? placeholder = <span className="fa fa-folder-o"> {currentNote.tags.value} </span> : placeholder = <span className="fa fa-folder-o">  </span>
        return (
            <div className="toolbarMeta">
                <button onClick={this.backToMain}>
                    <span className="fa fa-angle-left"> </span>
                </button>
			    {prioritySpan}
                <button onClick={this.deleteNote}>
                    <span className="fa fa-trash-o"> </span>
                </button>
                <CreatableSelect  
                    isClearable
                    placeholder={placeholder}
                    className='react-select-container'
                    classNamePrefix='react-select'
                    onChange={this.handleTagChange}
                    styles={customStyles}
                    options={this.props.tags} />
           	</div>
        )
    }
}

export default connect(   
    state => {     
        return {
            notes: state.notes,
            tags: state.tags
    }},
    dispatch => ({
        onDeleteNote: (noteIndex) => { 
            dispatch(deleteNote(noteIndex))
        },
        onChangeNote: (value, noteIndex) => {
            dispatch(changeNote(value, noteIndex))
        },
        onAddTag: (value) => {
            dispatch(addTag(value))
        },
        onToggleDisplay: (noteIndex) => {
            dispatch(makeNoteActive(-1))                    
        }
  })
)(ToolbarMeta);