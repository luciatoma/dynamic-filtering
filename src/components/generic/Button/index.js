import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const ButtonStyled = props => {
    const { active, handleBtnClick, title } = props;

    const handleToggle = () => {
        handleBtnClick && handleBtnClick(!active, title);
    };

    return (
        <button
            type="button"
            className={classNames({
                [styles.button]: true,
                [styles.active]: active,
            })}
            onClick={handleToggle}
        >
            {title}
        </button>
    );
};

ButtonStyled.propTypes = {
    active: PropTypes.bool,
    handleBtnClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default ButtonStyled;
