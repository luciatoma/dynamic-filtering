import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';

import colors from '../../../styles/constants';

// Generic styled checkbox input
const CheckboxStyled = props => {
    const { checked, handleCheck, title } = props;
    return (
        <CheckBox
            leftTextStyle={styles.checkboxText}
            leftText={title}
            checkBoxColor="white"
            isChecked={checked}
            onClick={() => handleCheck(!checked, title)}
        />
    );
};

const styles = StyleSheet.create({
    checkboxText: {
        color: colors.white,
    },
});
CheckboxStyled.propTypes = {
    checked: PropTypes.bool,
    handleCheck: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default CheckboxStyled;
