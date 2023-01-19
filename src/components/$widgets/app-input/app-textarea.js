import React from 'react';
import './app-input.scss'

const AppTextArea = (props) => {
    const {
        name, field, className, label,
        placeholder, onChange, onEnter,
        disabled
    } = props;

    const {error, value} = field || {};

    const hasError = !!error;

    const handleKeyPress = (e) => {
        if (onEnter && e.key === 'Enter') {
            onEnter(null)
        }
    }

    return (
        <fieldset className={`form-input ${className}`}>
            {label ? <label htmlFor={name}>{label}</label> : ''}
            <textarea
                className={`form-control ${hasError ? 'error' : ''}`}
                disabled={disabled}
                name={name}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                value={value}
                placeholder={placeholder}/>
            {error && <p className={'input-error'}>{error}</p>}
        </fieldset>
    );
};

export default AppTextArea;