import React from 'react';
import PageTitle from "../../components/page-title";
import {Link} from "react-router-dom";
import {data} from './alumni-data'
import AppCard from "../../components/$widgets/app-card";
import HRLine from "../../components/horizontal-rule/hr-line";

const Alumni = () => {
    return (
        <div className={'wargames-main'}>
            <PageTitle title='OverTheWire Alumni' className={'py-3'}/>
            <div className="container-fluid pt-4">
                <p className="pb-4 px-3 text-white">
                    OverTheWire (formerly known as PullThePlug.org) has been staffed by many volunteers over the
                    years. We appreciate all of them and their efforts.
                </p>
                <div className="row">
                    {data.map((alumini) => {
                        return <div key={alumini.id} className=" col-sm-6 col-md-6 col-lg-4">
                            <AppCard item={alumini}/>
                        </div>
                    })}
                </div>
            </div>

            <HRLine color="white" height="1px" margin="100px"/>
        </div>
    );
};

export default Alumni;