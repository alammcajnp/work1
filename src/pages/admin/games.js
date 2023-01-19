import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AllGames, deleteGame} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import Button from "../../components/$widgets/button";

const Games = ({dispatch}) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [games, setGames] = useState([]);

    const getGames = async () => {
        setLoading(true)
        const data_games = await AllGames();
        setLoading(false)
        setGames(data_games.data);
    }

    const deletedata = async (e, id) => {
        e.preventDefault();
        let answer = window.confirm("Are you sure to delete game?");
        if (answer) {
            const {error} = await deleteGame(id);
            if (error) return

            getGames()
        }
    }

    const addGame = async (e) => {
        e.preventDefault();
        history.push('/admin/add-game');
    }

    useEffect(() => {
        getGames();
    }, [])

    return (
        <div>
            <PageTitle className={'py-3'} title={'Games'}/>

            <section className="tf-contact">
                <div className="container-fluid px-0">
                    <div className="login-signup-main col-12">
                        {games.length < 1 ? (
                            <div className={'d-flex flex-column align-items-center'}>
                                <p className={'my-3'}>No games found, but you can add new games </p>
                                <Button className={'my-3'} title={'Add Game'} type="button" onClick={e => addGame(e)}/>
                            </div>
                        ) : <div>
                            <div className={'mb-4'}>
                                <Button title={'Add Game'} className="me-3" type="button" onClick={e => addGame(e)}/>
                                <Button title={'Add Level'} className="me-3" path={'/admin/add-level'}/>
                                <Button loading={loading} title={'Refresh'} className="mt-1" type="button"
                                        onClick={getGames}/>
                            </div>
                            <table className={'table table-bordered table-dark'}>
                                <thead>
                                <tr>
                                    <th>Game Type</th>
                                    <th>Game Name</th>
                                    {/*<th>Description</th>*/}
                                    <th>Host</th>
                                    <th>Port</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {games.map((val, index) => (
                                    <tr key={val._id}>

                                        <td>
                                            {val.game_type}
                                        </td>
                                        <td>
                                            {val.slug}
                                        </td>
                                        {/*<td style={{maxWidth: 150, maxHeight: 60}} className={'text-truncate'}>*/}
                                        {/*    <span title={val.description}>{val.description}</span>*/}
                                        {/*</td>*/}
                                        <td>
                                            {val.sshInfo ? val.sshInfo.host : 'NA'}
                                        </td>
                                        <td>
                                            {val.sshInfo ? val.sshInfo.port : 'NA'}
                                        </td>
                                        <td>
                                            <Link className={'link2'} to={`/admin/edit-game/${val._id}`}>Edit</Link>
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

export default connect()(Games);