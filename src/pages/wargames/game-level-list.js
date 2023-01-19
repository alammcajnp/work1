import React from 'react';
import SideMenuItem from "./side-menu-item";
import {useHistory} from "react-router-dom";

const GameLevelList = ({game, selectedLevel}) => {
    const history = useHistory()

    const handleClick = (level) => {
        if (level) {
            return history.push(`/wargames/${game.slug}/${level.slug}`)
        }
        history.push(`/wargames/${game.slug}`)
    }

    const goBack = () => {
        history.push(`/wargames`)
    }


    return <div className={'py-3'}>
        <h6 className={'d-flex justify-content-between align-items-center mb-2'}>
            <span className={'link2 text-white'} onClick={() => handleClick()}>{game.slug}</span>
            <span role={'link'}
                  className={'link2 back-link ml-1'}
                  onClick={goBack}>back</span>
        </h6>
        {game.levels.map((l) => {
            return <SideMenuItem key={`game${game.slug}-l-${l.id}`}
                                 label={l.text}
                                 isActive={l.slug === selectedLevel?.slug}
                                 onClick={() => handleClick(l)}/>
        })}
    </div>
};

export default GameLevelList;