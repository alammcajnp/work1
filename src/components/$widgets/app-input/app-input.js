import React from 'react';
import PasswordRevealEye from "../password-reveal-eye/password-reveal-eye";
import './app-input.scss'

const AppInput = (props) => {
    const {
        type, name, field, className, label,
        placeholder, onChange, onEnter,
        revealEye, handleReveal, disabled
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
            <input
                className={`${hasError ? 'error' : ''}`}
                type={type}
                disabled={disabled}
                name={name}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                value={value}
                placeholder={placeholder}/>
            {revealEye && <PasswordRevealEye onClick={handleReveal}/>}
            {error && <p className={'input-error'}>{error}</p>}
        </fieldset>
    );
};

export default AppInput;