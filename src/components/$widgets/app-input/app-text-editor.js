import React from 'react';
import './app-input.scss'
import {Editor} from "react-bootstrap-editor";

const AppTextEditor = (props) => {
    const {
        name, field, className,
        placeholder, onChange, onEnter,
        label, disabled
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
            <Editor defaultValue={value}
                    className={`${hasError ? 'error' : ''}`}
                    disabled={disabled}
                    placeholder={placeholder}
                    onKeyDown={handleKeyPress}
                    onChange={(res) => {
                        onChange({
                            target: {
                                name: name,
                                value: res
                            }
                        })
                    }} />

            {error && <p className={'input-error'}>{error}</p>}
        </fieldset>
    );
};

export default AppTextEditor;