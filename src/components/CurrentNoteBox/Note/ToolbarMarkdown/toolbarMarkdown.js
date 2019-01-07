import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { today } from '../../../../helpers/helpers.js';
import { changeNote } from '../../../../store/ac.js'; 

const ToolbarMarkdown = ({ notes, currentNote, onChangeNote }) => {
    
   	const handleChange = (e, openTag, closeTag) => {
   		
      const change = currentNote;    
   		const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
  		const text =  window.getSelection().toString();  	
  	  change.content = change.content.split(text).join(`${openTag}${text}${closeTag}`)
      console.log("CONTENT ", change.content)
      //пересечение & povtor markdown

      const markdown = /(<\/?strong?[^>]*>){2,}|(<\/?i[^>]*>){2,}|(<\/?u[^>]*>){2,}|(<\/?div[^>]*>){2,}|(<\/?b[^>]*>){2,}/g;
      const a = change.content.replace(markdown, ''); 
      change.content = a;
      change.edited = today;
     
	    onChangeNote(change, notePositionInStoreArray);
	}
    return (
        <div className="toolbarMarkdown">
			    <button id="bold" title="Bold (Ctrl+B)" onClick={() => handleChange(event, "<strong>", "</strong>")}><i className="fa fa-bold"></i></button>
			    <button id="italic" title="Italic (Ctrl+I)" onClick={() => handleChange(event, "<i>", "</i>")}><i className="fa fa-italic"></i></button>
			    <button id="underline" title="Underline (Ctrl+U)" onClick={() => handleChange(event, "<u>", "</u>")}><i className="fa fa-underline"></i></button>
		      </div>
    )    
}

ToolbarMarkdown.propTypes = {
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

export default connect(
    state => {     
      return {
           notes: state.notes
    }},
    dispatch => ({
      onChangeNote: (value, noteIndex) => {
              dispatch(changeNote(value, noteIndex))
      }
  })
)(ToolbarMarkdown);