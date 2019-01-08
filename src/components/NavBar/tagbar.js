import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import customStyles from '../../sass/selectstyles.js';
import { connect } from 'react-redux';
import { makeTagActive, makeNoteActive } from '../../store/ac.js'; 

const TagBar = ({ tags, active, onTagChange }) => {

    const handleChange = (selectedOption) => onTagChange(selectedOption)

    const options = tags ? [{ value: 'allNotes', label: 'All Notes' }, ...tags] : [{ value: 'allNotes', label: 'All Notes' }];
    let placeholder;
    active.activeTag.value ? placeholder = <span className="fa fa-caret-down" > <h5>{active.activeTag.label}</h5> </span> : null
    return (
        <Select
            styles={customStyles}
            className='react-select-container'
            placeholder={placeholder}
            classNamePrefix='react-select'
            onChange={handleChange}
            options={options} />
    );    
}

TagBar.propTypes =  {
    tags: PropTypes.array,
    active: PropTypes.shape({
        activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
        activeNote: PropTypes.number
    }),
    onTagChange: PropTypes.func
}

export default connect(state => {
        return {
            tags: state.tags,
            active: state.active
        }
    },
    dispatch => ({
        onTagChange: (tag) => {
            dispatch(makeTagActive(tag))
            dispatch(makeNoteActive(0))
        }
    })
)(TagBar);


