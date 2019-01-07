
import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect  from 'react-select/lib/Creatable';
import { connect } from 'react-redux';
import { today } from '../../../../helpers/helpers.js';
import customStyles from '../../../../sass/selectstyles.js';
import { deleteNote, changeNote, addTag, makeNoteActive } from '../../../../store/ac.js'; 

const ToolbarMeta = ({ notes, tags, currentNote, onChangeNote, onDeleteNote, onAddTag, onToggleDisplay }) => {

    const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
    const change = currentNote;
    change.edited = today;

    const priorityChange = () => {           
        change.priority = !currentNote.priority;
        onChangeNote(change, notePositionInStoreArray);
    }
  
    const handleTagChange = (newValue) => {      
        change.tags = newValue;
        change.edited = today;
        onChangeNote(change, notePositionInStoreArray);
        if (tags.every( (i) => i.value !== newValue.value)) { 
           onAddTag(newValue);
           }
    }

    const deleteNote = () => onDeleteNote(notePositionInStoreArray)
	
    const backToMain = () => onToggleDisplay(0) 

   
	let prioritySpan, placeholder;       
    currentNote.priority ? prioritySpan = <button onClick={priorityChange}><span className="fa fa-star">  </span></button> : prioritySpan = <button onClick={priorityChange}> <span className="fa fa-star-o" >  </span></button>
    currentNote.tags.value ? placeholder = <span className="fa fa-folder-o"> {currentNote.tags.value} </span> : placeholder = <span className="fa fa-folder-o"> Add a tag  </span>
        
    return (
        <div className="toolbarMeta">
            <button onClick={backToMain}>
                <span className="fa fa-angle-left"> </span>
            </button>
		    {prioritySpan}
            <button onClick={deleteNote}>
                <span className="fa fa-trash-o" > </span>
            </button>
            <CreatableSelect  
                isClearable
                placeholder={placeholder}
                className='react-select-container'
                classNamePrefix='react-select'
                onChange={handleTagChange}
                styles={customStyles}
                options={tags} />
       	</div>
        )    
}

ToolbarMeta.propTypes = {
    notes: PropTypes.array,
    tags: PropTypes.array,
    currentNote: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.string,
            edited: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number
        }),
    onDeleteNote: PropTypes.func, 
    onChangeNote: PropTypes.func,
    onAddTag: PropTypes.func,
    onToggleDisplay: PropTypes.func        
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
            dispatch(makeNoteActive(noteIndex))                    
        }
  })
)(ToolbarMeta);