import React, { Component } from 'react';
import Select from 'react-select';
import customStyles from '../../sass/selectstyles.js';
import { connect } from 'react-redux';
import { makeTagActive, makeNoteActive } from '../../store/ac.js'; 

class TagBar extends Component {

	handleChange = (selectedOption) => {
    this.props.onTagChange(selectedOption);
	}

	render() {
		const options = (this.props.tags) ? [{value: 'allNotes', label: 'All Notes'}, ...this.props.tags] : [{value: 'allNotes', label: 'All Notes'}];
		let placeholder;
 		this.props.active.activeTag.value ? placeholder = <span className="fa fa-caret-down" >  {this.props.active.activeTag.label} </span> : null
		return (
			 <Select
          styles={customStyles}
          className='react-select-container'
          placeholder={placeholder}
          classNamePrefix='react-select'
          onChange={this.handleChange}
          options={options} /> 
		);
	}
}

export default connect( state => {
    return {
        tags: state.tags,
        active: state.active
    }}
,
   dispatch => ({
       onTagChange: (tag) => {
          dispatch(makeTagActive(tag))
          dispatch(makeNoteActive(-1))
    }
  })
)(TagBar);



