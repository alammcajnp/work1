import React from 'react';
import './breadcrum.scss'

const Breadcrum = ({items}) => {
    return (
        <div className={'breadcrumb-main'}>
            <div className="breadcrumb">
                {items.map((b, index) => {
                    const isLast = items.length === index + 1;
                    return <a className={`breadcrumb__step ${isLast ? 'breadcrumb__step--active' : ''}`} href="src/components/$widgets/breadcrum/breadcrum#">{b}</a>
                })}
            </div>
        </div>
    );
};

export default Breadcrum;