import React from 'react';
import PageTitle from "../../components/page-title";
import {Link} from "react-router-dom";
import {data} from "./staff-data";
import AppCard from "../../components/$widgets/app-card";
import HRLine from "../../components/horizontal-rule/hr-line";

const Staff = () => {
    return (
        <div className={'wargames-main'}>
            <PageTitle title='Staff' className={'py-3'}/>
            <div className="container-fluid py-4">
                <p className="pb-4 px-3 text-white">
                    OverTheWire (formerly known as PullThePlug.org) has been staffed by many volunteers over the
                    years. We appreciate all of them and their efforts.
                </p>
                <div className="row">
                    {data.map((staff) => {
                        return <div key={staff.id} className=" col-sm-6 col-md-6 col-lg-4">
                            <AppCard item={staff}/>
                        </div>
                    })}
                </div>
            </div>

            <HRLine color="white" height="1px" margin="100px"/>
        </div>
    );
};

export default Staff;