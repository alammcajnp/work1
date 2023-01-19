import React from 'react';
import SideMenuItem from "./side-menu-item";
import {useHistory} from "react-router-dom";

const GameList = ({games, selectedGame}) => {

    const history = useHistory()
    const handleClick = (game) => {
        history.push(`/wargames/${game.slug}`)
    }

    if (!games.name && !games.games) return;

    return <div className={'pb-3'}>
        <h6>{games.name}</h6>
        {games.games.map((g) => {
            return <SideMenuItem key={`g-level-${g.id}`}
                                 label={g.slug}
                                 isActive={g.slug === selectedGame?.slug}
                                 onClick={() => handleClick(g)}/>
        })}
    </div>
};

export default GameList;