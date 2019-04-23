import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

import Checkbox from '../Checkbox/index';
import colors from '../../../styles/constants';

// Styled popup component for filter buttons that require input
const Popup = props => {
    const { activeFilters, popupValues, title, userInput } = props;

    const handleCheckbox = (checked, value, item) => {
        popupValues({ item, value, checked, title });
    };

    const handleDatePickr = (date, item) => {
        popupValues({ item, value: date, title });
    };

    return (
        <View style={styles.popupWrapper}>
            {userInput.map(item => {
                if (item.filter !== 'StartDate') {
                    return (
                        <View key={item.filter}>
                            <Text style={styles.popupText}>Select {item.filter}</Text>
                            <View style={styles.popupCheckbox}>
                                {item.values.map(value => (
                                    <Checkbox
                                        key={value}
                                        title={value}
                                        checked={activeFilters[item.filter] && activeFilters[item.filter].includes(value)}
                                        handleCheck={checked => handleCheckbox(checked, value, item.filter)}
                                    />
                                ))}
                            </View>
                        </View>
                    );
                }

                return (
                    <View key={item.filter}>
                        <Text style={styles.popupText}>Select {item.filter}</Text>
                        <DatePicker
                            date={activeFilters[item.filter] || new Date()}
                            onDateChange={date => handleDatePickr(date, item.filter)}
                            format="DD-MM-YYYY"
                            customStyles={{
                                dateInput: {
                                    backgroundColor: colors.white,
                                    borderColor: colors.blue,
                                    borderRadius: 4,
                                    marginTop: 10,
                                    width: '100%',
                                },
                            }}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    popupWrapper: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.blue,
        backgroundColor: colors.blue,
        marginTop: 5,
        paddingTop: 25,
        paddingRight: 25,
        paddingBottom: 25,
        paddingLeft: 25,
    },
    popupText: {
        color: colors.white,
        fontWeight: '600',
    },
    popupCheckbox: {
        borderTopColor: colors.white,
        borderTopWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
    },
});

Popup.propTypes = {
    activeFilters: PropTypes.object.isRequired,
    popupValues: PropTypes.func.isRequired,
    title: PropTypes.string,
    userInput: PropTypes.array,
};

export default Popup;
