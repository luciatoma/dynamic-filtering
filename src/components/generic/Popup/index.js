import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

import Checkbox from '../Checkbox';
import styles from './styles.scss';

const Popup = props => {
    const { activeFilters = {}, popupValues, title, userInput } = props;

    const handleCheckbox = (e, item) => {
        const {
            target: { value, checked },
        } = e;

        console.log('active', value);

        let values = activeFilters ? activeFilters[item] : [];
        if (!values) values = [];
        if (checked && !values.includes(value)) values.push(value);
        if (!checked && values.includes(value)) values = values.filter(option => option !== value);

        const newChecked = { ...activeFilters, [item]: values };

        popupValues && popupValues(newChecked, title);
    };

    const handleDatePickr = (date, item) => {
        const newChecked = { ...activeFilters, [item]: date };

        popupValues && popupValues(newChecked, title);
    };

    return (
        <div className={styles.wrapper}>
            {userInput.map(item => {
                if (item.filter !== 'StartDate') {
                    return (
                        <div key={item.filter}>
                            <span className={styles.filterTitle}>Select {item.filter}</span>
                            <div className={styles.valuesWrapper}>
                                {item.values.map(value => (
                                    <Checkbox
                                        key={value}
                                        title={value}
                                        value={value}
                                        checked={activeFilters[item.filter] && activeFilters[item.filter].includes(value)}
                                        onChange={e => handleCheckbox(e, item.filter)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={item.filter}>
                        <span className={styles.filterTitle}>Select {item.filter}</span>
                        <Flatpickr
                            value={activeFilters[item.filter] || new Date()}
                            onChange={date => handleDatePickr(date, item.filter)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

Popup.propTypes = {
    activeFilters: PropTypes.object,
    popupValues: PropTypes.func,
    title: PropTypes.string,
    userInput: PropTypes.array,
};

export default Popup;
