import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import colors from '../../../styles/constants';

// Styled card which stores work order information
const WorkOrderCard = props => {
    const { color, description, endDate, name, startDate, status, type } = props;
    const colorBlue = color === 'Blue';
    const colorGreen = color === 'Green';
    const colorRed = color === 'Red';

    return (
        <View
            style={[
                styles.cardWrapper,
                colorBlue && styles.borderBlue,
                colorGreen && styles.borderGreen,
                colorRed && styles.borderRed,
            ]}
        >
            <View
                style={[
                    styles.cardHeader,
                    colorBlue && styles.colorBlue,
                    colorGreen && styles.colorGreen,
                    colorRed && styles.colorRed,
                ]}
            >
                <View>
                    <Text style={styles.cardHeaderText}>
                        {moment(startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')} -{' '}
                        {moment(endDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')}
                    </Text>
                </View>
                <View>
                    <Text style={styles.cardHeaderText}>{name}</Text>
                </View>
                <View>
                    <Text style={styles.cardHeaderText}>{type}</Text>
                    <Text style={styles.cardHeaderText}>Status: {status}</Text>
                </View>
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.cardDetailsSubtitle}>Notification</Text>
                <Text style={styles.cardDetailsText}>solar panel does not work</Text>
                <Text style={styles.cardDetailsSubtitle}>Office remarks</Text>
                <Text style={styles.cardDetailsText}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
        width: '100%',
    },
    borderBlue: {
        borderColor: colors.blue,
    },
    borderGreen: {
        borderColor: colors.green,
    },
    borderRed: {
        borderColor: colors.red,
    },
    colorBlue: {
        backgroundColor: colors.blue,
    },
    colorGreen: {
        backgroundColor: colors.green,
    },
    colorRed: {
        backgroundColor: colors.red,
    },
    cardHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 6,
        paddingRight: 6,
    },
    cardHeaderText: {
        color: colors.white,
        fontWeight: '600',
        marginBottom: 5,
    },
    cardDetails: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    cardDetailsSubtitle: {
        fontWeight: '700',
    },
    cardDetailsText: {
        color: colors.gray,
        fontSize: 14,
    },
});

WorkOrderCard.propTypes = {
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default WorkOrderCard;
