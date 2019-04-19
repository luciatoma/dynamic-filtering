import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import styles from './styles.scss';

const WorkOrderCard = props => {
    const { description, color, endDate, name, startDate, status, type } = props;
    return (
        <div
            className={classNames({
                [styles.cardWrapper]: true,
                [styles.blueBorder]: color === 'Blue',
                [styles.greenBorder]: color === 'Green',
                [styles.redBorder]: color === 'Red',
            })}
        >
            <div
                className={classNames({
                    [styles.header]: true,
                    [styles.blue]: color === 'Blue',
                    [styles.green]: color === 'Green',
                    [styles.red]: color === 'Red',
                })}
            >
                <span className={styles.headerCol}>
                    {moment(startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')} -{' '}
                    {moment(endDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')}
                </span>
                <span className={styles.headerCol}>{name}</span>
                <span
                    className={classNames({
                        [styles.headerCol]: true,
                        [styles.lastCol]: true,
                    })}
                >
                    <span>{type}</span>
                    <span>Status: {status}</span>
                </span>
            </div>
            <div className={styles.details}>
                <div>
                    <span className={styles.detailsSubtitle}>Customer</span>
                    <span>Magna</span>
                    <span>Meijendel 26</span>
                    <span>1941CM Beverwijk</span>
                </div>
                <div>
                    <span className={styles.detailsSubtitle}>Installation</span>
                    <span>Suntech 245Wp-2151</span>
                    <span className={styles.detailsSubtitle}>Contract</span>
                    <span>Full Service 24/7</span>
                </div>
                <div>
                    <span className={styles.detailsSubtitle}>Notification</span>
                    <span>solar panel does not work</span>
                    <span className={styles.detailsSubtitle}>Office remarks</span>
                    <span>{description}</span>
                </div>
            </div>
        </div>
    );
};

WorkOrderCard.propTypes = {
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default WorkOrderCard;
