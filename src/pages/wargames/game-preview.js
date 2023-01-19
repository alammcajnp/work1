import React from 'react';
import defaultGameData from './sample-data/default-game.json';
import HRLine from "../../components/horizontal-rule/hr-line";
import SubmitGameLevel from "./submit-game-level/submit-game-level";

const GamePreviewInner = (props) => {
    const {game, level} = props;

    if (level) {
        return <div className={'pb-2'}>
            <div dangerouslySetInnerHTML={{__html: level.description}}></div>
            <HRLine className={'my-3'}/>
            <SubmitGameLevel {...props} />
        </div>
    }

    if (game) {
        return <div dangerouslySetInnerHTML={{__html: game.description}}></div>
    }

    return <div dangerouslySetInnerHTML={{__html: defaultGameData.html}}></div>
};

const GamePreview = (props) => {
    return <div className={'external-html py-3 p-sm-2'}>
        <GamePreviewInner {...props} />
    </div>
}

export default GamePreview;