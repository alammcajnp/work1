import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AllLevels, deleteLevel} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import Button from "../../components/$widgets/button";

const Levels = ({dispatch}) => {

    const history = useHistory();
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLevels = async () => {
        setLoading(true)
        const data_games = await AllLevels();
        setLoading(false)
        setLevels(data_games.data.levels);
    }

    const deletedata = async (e, id) => {
        e.preventDefault();
        let answer = window.confirm("Are you sure to delete level?");
        if (answer) {
            setLoading(true)
            const result = await deleteLevel(id);
            setLoading(false)
            getLevels();
        }
    }

    const addLevel = async (e) => {
        e.preventDefault();
        history.push('/admin/add-level');
    }

    useEffect(() => {
        getLevels();
    }, []);

    return (
        <div>
            <PageTitle className={'py-3'} title={'Levels'}/>

            <section className="tf-contact">
                <div className="container-fluid px-0">
                    <div className="login-signup-main col-12">
                        {!levels || levels.length === 0 ? (
                            <div className={'d-flex flex-column align-items-center'}>
                                <p className={'my-3'}>No levels found, but you can add new levels </p>
                                <Button className={'my-3'} title={'Add Level'} type="button" onClick={e => addLevel(e)}/>
                            </div>
                        ) : <div>
                            <div className="mb-3">
                                <Button title={'Add Level'} className="me-3" type="button" onClick={e => addLevel(e)}/>
                                <Button loading={loading} title={'Refresh'} className="mt-1" type="button"
                                        onClick={getLevels}/>
                            </div>
                            <table className={'table table-bordered table-dark'}>
                                <thead>
                                <tr>
                                    <th>Game Name</th>
                                    <th>Level Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {levels.map((val, index) => (
                                    <tr key={val._id}>
                                        <td>{val.game_id ? val.game_id.slug : 'NA'}</td>
                                        <td>{val.text ? val.text : 'NA'} </td>
                                        <td>
                                            <Link className={'link2'} to={`/admin/edit-level/${val._id}`}>Edit</Link>
                                            <span className={'mx-1'}>|</span>
                                            <span className={'link2'}
                                                  onClick={e => deletedata(e, `${val._id}`)}>Delete</span>
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

export default connect()(Levels);