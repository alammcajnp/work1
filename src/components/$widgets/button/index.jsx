import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './styles.scss';


Button.propTypes = {
    title: PropTypes.string,
    path: PropTypes.string,
};

function Button(props) {
    const {title, path, onClick, type, children, className, disabled, loading} = props;
    return path ? <Link className={`tf-button d-inline-flex align-items-center btn-effect ${className}`} to={path} onClick={onClick}>
        <span className="boder-fade"></span>
        <span className="effect">{title}</span>
    </Link> : <button disabled={disabled} type={type} className={`tf-button btn-effect d-inline-flex align-items-center ${className}`} onClick={onClick}>
        <span className="boder-fade"></span>
        <span className="effect">{title}</span>
        {children}
        {loading ? <i className="far fa-spinner-third fa-spin ml-3"></i> : ''}
    </button>
}

export default Button;