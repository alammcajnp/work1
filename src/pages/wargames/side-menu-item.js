import React from 'react';

const SideMenuItem = ({isActive, label, onClick}) => {
    return (
        <div className={`side-menu-item ${isActive ? 'active' : ''}`}>
            <p className={'cursor-pointer'}
               onClick={onClick}>
                {label}
            </p>
        </div>
    );
};
export default SideMenuItem;