import React, {useEffect, useState} from 'react';
// import onlineGames from './sample-data/online-games.json'
// import offlineGames from './sample-data/offline-games.json'
import released from './sample-data/released.json'
import PageTitle from "../../components/page-title";
import {useHistory, useParams} from "react-router-dom";
import GamePreview from "./game-preview";
import './wargames.scss'
import GameList from "./game-list";
import GameLevelList from "./game-level-list";
import SSHDetails from "./ssh-details";
import {connect} from "react-redux";
import {fetchGames} from "../../redux/action-creators";

const Wargames = (props) => {
    console.log('new Props', props);
    const games = [
        ...props.onlineGames.games,
        ...props.offlineGames.games,
        ...released.games
    ];
    const params = useParams()
    const {gameSlug, levelSlug} = params;
    const gameSelected = !!gameSlug;

    const game = games.find((g) => g.slug === gameSlug)
    const level = game?.levels?.find(l => l.slug === levelSlug)

    useEffect(() => {
        props.fetchGames()
    }, [])

    useEffect(() => {
        console.log('new games found', props.onlineGames)
    }, [props.onlineGames, props.offlineGames])

    return (
        <div className={'wargames-main'}>

            <PageTitle title='Wargames' className={'py-3'} ssh={game?.sshInfo}/>

            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-2 side-bar-col">
                        <div className="px-sm-0">
                            {gameSelected && game?.levels
                                ? <div>
                                    <GameLevelList game={game}
                                                   selectedLevel={level} />
                                </div>
                                : <div className={'py-3'}>

                                    <GameList games={props.onlineGames}
                                              selectedGame={game}
                                              type={'Online'}/>

                                    <GameList games={props.offlineGames}
                                              selectedGame={game}
                                              type={'Offline'}/>

                                    <GameList games={released}
                                              selectedGame={game}
                                              type={'Released'}/>
                                </div>}
                        </div>
                    </div>
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <GamePreview game={game} level={level}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

// map global state(redux state) with props of this component
const mapStateToProps = (store) => {
    return {
        onlineGames: store.onlineGames,
        offlineGames: store.offlineGames,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(fetchGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wargames);