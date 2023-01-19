import React from 'react';

const AppSwitch = (props) => {
    const {
        checked, label, handleChange, name
    } = props;

    const onChange = (e) => {
        handleChange({name: name, checked: e.target.checked})
    }

    return (
        <div className="form-check form-switch">
            <input className="form-check-input"
                   checked={checked}
                   onChange={onChange}
                   id={name}
                   type="checkbox" />
            <label className="form-check-label"
                   htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

export default AppSwitch;