import React from 'react';

const SSHDetails = ({host, port}) => {
    return (
        <div className="wrap-about" data-aos="fade-up" data-aos-duration="800">
            <div className={`box-text corner-box`}>
                <div className="h7">SSH Information</div>
                <p>Host: {host}</p>
                <p>Port: {port}</p>
            </div>
        </div>
    );
};

export default SSHDetails;