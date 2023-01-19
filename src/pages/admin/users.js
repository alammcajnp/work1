import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import {Link, useHistory} from "react-router-dom";
import {AllUser} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import Button from "../../components/$widgets/button";

const Users = ({dispatch}) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [stateOptions, setStateValues] = useState([]);

    const getUsers = async () => {
        setLoading(true)
        const data_users = await AllUser();
        setLoading(false)
        setStateValues(data_users.result.data);
    }
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <PageTitle className={'py-3'} title={'Users'}/>

            <section className="tf-contact">
                <div className="container-fluid px-0">
                    <div className="login-signup-main col-12">
                         {stateOptions.length < 1 ? (
                           <span>No user found </span>
                        ) : <div>
                             <div className="mb-3">
                                 <Button loading={loading} title={'Refresh'} className="mt-1" type="button" onClick={getUsers}/>
                             </div>
                             <table className={'table table-bordered table-dark'}>
                                 <thead>
                                 <tr>
                                     <th>Name</th>
                                     <th>Mobile</th>
                                     <th>Email</th>
                                     <th>Created Date</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 {stateOptions.map((val, index) => (
                                     <tr key={val._id}>
                                         <td>
                                             {val.full_name}
                                         </td>
                                         <td>
                                             {val.mobile ? val.mobile : 'NA'}
                                         </td>
                                         <td>
                                             {val.email}
                                         </td>
                                         <td>
                                             {val.created_at ? Moment(val.created_at).format('DD-MM-YYYY'): 'NA'}
                                         </td>
                                     </tr>
                                 ))}
                                 </tbody>
                             </table>
                         </div>}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default connect()(Users);