import React from 'react';
import { today } from '../../../../helpers/helpers.js';
import { connect } from 'react-redux';
import { changeNote } from '../../../../store/ac.js'; 

class ToolbarMarkdown extends React.Component {

   	handleChange = (e, openTag, closeTag) => {
   		const { notes, currentNote, onChangeNote } = this.props;
   		const notePositionInStoreArray = notes.findIndex((e) => e.index === currentNote.index);
  		let text =  window.getSelection().toString();
  		const change = currentNote;
  		change.content = change.content.split(text).join(`${openTag}${text}${closeTag}`)
  		change.edited = today;
	    this.props.onChangeNote(change, notePositionInStoreArray);
	}
	
    render() {
        return (
            <div className="toolbarMarkdown">
			    <button id="bold" title="Bold (Ctrl+B)" onClick={() => this.handleChange(event, "<strong>", "</strong>")}><i className="fa fa-bold"></i></button>
			    <button id="italic" title="Italic (Ctrl+I)" onClick={() => this.handleChange(event, "<i>", "</i>")}><i className="fa fa-italic"></i></button>
			    <button id="underline" title="Underline (Ctrl+U)" onClick={() => this.handleChange(event, "<u>", "</u>")}><i className="fa fa-underline"></i></button>

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
      }
  })
)(ToolbarMarkdown);