import React, {useEffect, useState} from 'react';
import './password-reveal-eye.scss'

const PasswordRevealEye = ({onClick}) => {
    const [open, setOpen] = useState(false)
    return (
        <span onClick={() => {
            setOpen(!open)
            onClick(!open)
        }}
              className={'password-reveal-eye'}>
                {
                    !open ? <i className="far fa-eye"></i> :
                    <i className="far fa-eye-slash"></i>
                }
        </span>
    );
};

export default PasswordRevealEye;