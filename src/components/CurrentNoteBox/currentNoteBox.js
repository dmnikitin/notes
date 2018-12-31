
import React from 'react';
import Note from './Note/note.js';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';


export default class CurrentNoteBox extends React.Component {
	
	state = { activeNote: -1 }
	
	componentWillMount = () => {
		// this.setState({ activeNote: this.props.activeNote })
		// let { notes, activeNote, changeNotesList } = this.props;
		// 	const thisNote = notes.findIndex((e) => e.index === activeNote);
		// console.log("!!!!!!", notes[thisNote].content)
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ activeNote: -1 })
		if (nextProps.activeNote!==this.props.activeNote   ) {
			setTimeout( () => this.setState({ activeNote: this.props.activeNote }), 0 )
        } 
        else { 
        	this.setState({ activeNote: this.props.activeNote })
        }
	
	}

	render() {

		let note;
		let { notes, activeNote, changeNotesList, addTag } = this.props;
		const thisNote = notes.findIndex((e) => e.index === activeNote);
			    
		if (this.state.activeNote === -1) { note = <h1></h1>}
			else if (this.state.activeNote !== -1 && notes[thisNote]) {
				note =  <CSSTransition timeout={500} classNames="fade">
							<Note key={thisNote} currentNote={notes[thisNote]} notes={notes} changeNotesList={changeNotesList} tags={this.props.tags} addTag={addTag} />
					    </CSSTransition>
			} else {note = <h1> Press on existing note or make a new by clickin on add button! </h1>}

	    return (
	       <TransitionGroup className="currentNoteBox">
	            {note}
	        </TransitionGroup>
	    )
	}
}





				