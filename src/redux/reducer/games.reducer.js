import Action from "../action";
import {initialState} from "../store";

export default function GamesReducer(state = initialState, action = {}) {
    console.log('GamesReducer new action =>> ', action)
    switch (action.type) {
        case Action.Games:
            console.log('new Games to udpate', action)
            return {
                ...state,
                onlineGames: action.onlineGames,
            };
        default:
            return state;
    }
}
