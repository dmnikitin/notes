import React from 'react';
export default class ToolbarMarkdown extends React.Component {

   	handleChange = (e, openTag, closeTag) => {
		let text =  window.getSelection().toString();
		let thisNote = this.props.currentNote;
		thisNote.content = thisNote.content.split(text).join(`${openTag}${text}${closeTag}`)
		console.log("markdown ", thisNote.content)
		console.log("markdown all", thisNote )
		this.props.changeNotesList('changeNote', thisNote, thisNote.index)
		
	}
	
    render() {
        return (
            <div className="toolbarMarkdown">
			    <button id="bold" title="Bold (Ctrl+B)" onClick={() => this.handleChange(event, "&lt;strong&gt; ", "&lt;/strong&gt; ")}><i className="fa fa-bold"></i></button>
			    <button id="italic" title="Italic (Ctrl+I)" onClick={() => this.handleChange(event, "<i>", "</i>")}><i className="fa fa-italic"></i></button>
			    <button id="underline" title="Underline (Ctrl+U)" onClick={() => this.handleChange(event, "<u>", "</u>")}><i className="fa fa-underline"></i></button>
			</div>
        )
    }
}