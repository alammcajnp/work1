import React from 'react';
import PageTitle from "../../components/page-title";
import './edit-website.scss'

const EditWebsite = () => {
    return (
        <div className={'edit-website-main'}>
            <PageTitle title='Edit Website' className={'py-3'}/>
            <div className="container-fluid container1 py-3 py-sm-0">
                <div className="inner text-center">
                    <h5 className={'pb-2'}>Editing this website</h5>
                    <p className={'pb-3'}>
                        If you spot an error on this webpage, you may correct it yourself by cloning this website
                        from <a className={'link2'} href={'https://github.com/OverTheWireOrg/OverTheWire-website'}
                                target="_blank">https://github.com/OverTheWireOrg/OverTheWire-website</a> and submitting
                        a pull request.
                    </p>
                    <p>
                        Thank you very much for your help!!
                    </p>
                </div>
            </div>

        </div>
    );
};

export default EditWebsite;