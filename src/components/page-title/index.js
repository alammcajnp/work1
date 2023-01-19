import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import SSHDetails from "../../pages/wargames/ssh-details";

PageTitle.propTypes = {
    title: PropTypes.string,
};

function PageTitle(props) {
    const {title, ssh, className} = props;

    return (
        <section className={`page-title`}>
            <div className="container">
                <div className="row">
                    {ssh ? <div className="col-md-5 px-0">
                        <SSHDetails host={ssh.host} port={ssh.port}/>
                    </div> : null}
                    <div className={`d-flex align-items-center justify-content-center ${className} ${ssh ? 'col-md-7' : 'cold-md-12'}`}>
                        <div className="breadcrumbs" data-aos="zoom-in" data-aos-duration="800">
                            <h3>{title}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PageTitle;