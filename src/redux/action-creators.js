import {getGames} from "../service/api/game.service";
import Action from "./action";

export const fetchGames = () => {
    // return {type: Action.OnlineGames, games}
    return async (dispatch, getState) => {
        const {error, result} = await getGames();
        console.log({error, result})
        const onlineGames = {
            name: 'Online',
            id: 'online',
            games: result.data.games.filter(game => game.game_type.toLowerCase() === 'online')
        }
        const offlineGames = {
            name: 'Offline',
            id: 'offline',
            games: result.data.games.filter(game => game.game_type.toLowerCase() === 'offline')
        }
        dispatch({type: Action.Games, onlineGames, offlineGames})
    }
}