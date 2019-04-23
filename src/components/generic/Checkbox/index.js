import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

// Generic styled checkbox input
const Checkbox = props => {
    const { value, onChange, title, checked } = props;
    return (
        <label className={styles.check}>
            {title}
            <input type="checkbox" value={value} defaultChecked={checked} onChange={onChange} />
            <span className={styles.checkmark} />
        </label>
    );
};

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};

export default Checkbox;
