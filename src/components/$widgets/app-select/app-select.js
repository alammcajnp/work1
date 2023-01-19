import React from 'react';

const AppSelect = (props) => {
    const {
        name, field, className, label,
        onChange,
        disabled, options
    } = props;

    const {error, value} = field || {};

    const hasError = !!error;

    return (
        <fieldset className={`form-input ${className}`}>
            {label ? <label htmlFor={name}>{label}</label> : ''}
            <select onChange={onChange}
                    value={value}
                    disabled={disabled}
                    name={name}
                    className={`${hasError ? 'error' : ''}`}>
                <option value={''}>Select</option>
                {options.map((option, index) => (
                    <option key={option.value} value={option.value}> {option.label} </option>
                ))}
            </select>
            {error && <p className={'input-error'}>{error}</p>}
        </fieldset>
    );
};

export default AppSelect;