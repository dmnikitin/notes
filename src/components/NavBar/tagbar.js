import React, { Component } from 'react';
import Select from 'react-select';
import customStyles from '../../sass/selectstyles.js';

export default class TagBar extends Component {

	state = { selectedOption: {} }
 	handleChange = (selectedOption) => {
        this.setState({ selectedOption });
	    this.props.toggleTagView(selectedOption.value)
    }

	render() {
		const options = [{value: 'allNotes', label: 'All Notes'}, ...this.props.tags];
		return (
			 <Select
                    styles={customStyles}
                    className='react-select-container'
                    placeholder={this.state.selectedOption.value || "All Notes"}
                    classNamePrefix='react-select'
                    onChange={this.handleChange}
                    options={options} /> 
		);
	}
}

