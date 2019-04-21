import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const ButtonStyled = props => {
    const { active, title } = props;

    const handleToggle = () => {
        const { handleBtnClick } = props;
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
    handleBtnClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

export default ButtonStyled;
