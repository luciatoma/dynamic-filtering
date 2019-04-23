import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../../styles/constants';

// Generic styled button
const ButtonStyled = props => {
    const { active, handleBtnClick, title } = props;

    const handleToggle = () => {
        handleBtnClick && handleBtnClick(!active, title);
    };

    return (
        <TouchableHighlight style={[active && styles.activeBtnWrapper]} onPress={handleToggle}>
            <Text style={[styles.button, active && styles.activeBtn]}>{title}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: colors.blue,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'transparent',
        color: colors.blue,
        fontSize: 14,
        fontWeight: '500',
        paddingTop: 6,
        paddingRight: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        textAlign: 'center',
    },
    activeBtnWrapper: {
        backgroundColor: colors.blue,
    },
    activeBtn: {
        color: colors.white,
    },
});

ButtonStyled.propTypes = {
    active: PropTypes.bool,
    handleBtnClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default ButtonStyled;
