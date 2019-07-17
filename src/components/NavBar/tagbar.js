import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import customStyles from '../../sass/selectstyles';
import { makeTagActive, makeNoteActive } from '../../store/ac';

const TagBar = ({ tags, active, stopSearch, onTagChange }) => {
    const handleChange = (selectedOption) => {
        onTagChange(selectedOption);
        stopSearch();
    };
    const options = tags ? [{ value: 'allNotes', label: 'All Notes' }, ...tags] : [{ value: 'allNotes', label: 'All Notes' }];
    const placeholder = active.activeTag.value
        ? <span className="fa fa-caret-down"><h5>{active.activeTag.label}</h5></span>
        : null;

    return (
        <Select
          styles={customStyles}
          className="react-select-container"
          placeholder={placeholder}
          classNamePrefix="react-select"
          onChange={handleChange}
          options={options}
        />
    );
};

TagBar.defaultProps = {
    active: {},
    tags: [],
};

TagBar.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object),
    active: PropTypes.shape({
        activeTag: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
        activeNote: PropTypes.number,
    }),
    onTagChange: PropTypes.func.isRequired,
    stopSearch: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        tags: state.tags,
        active: state.active,
    }),
    dispatch => ({
        onTagChange: (tag) => {
            dispatch(makeTagActive(tag));
            dispatch(makeNoteActive(0));
        },
    }),
)(TagBar);
