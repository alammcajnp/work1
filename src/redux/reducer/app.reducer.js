import Action from "../action";
import {initialState} from "../store";

export default function AppReducer(state = initialState, action = {}) {
    console.log('AppReducer new action =>> ', action)
    switch (action.type) {
        case Action.UpdateDevice:
            return {
                ...state,
                device: action.device,
            };
        case Action.UpdateWebLocation:
            return {
                ...state,
                location: action.location,
            };
        case Action.UpdateUser:
            return {
                ...state,
                user: action.user,
            };
        case Action.UpdateAdmin:
            return {
                ...state,
                admin: action.admin,
            };
        case Action.Games:
            return {
                ...state,
                onlineGames: action.onlineGames,
                offlineGames: action.offlineGames,
            };
        default:
            return state;
    }
}
