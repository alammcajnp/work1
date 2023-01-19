import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AppReducer from "./reducer/app.reducer";
import {composeWithDevTools} from "redux-devtools-extension";

export const initialState = {
    device: {
        width: 0,
        scale: 0,
        breakpoint: 'xs',
        user: null
    },
    location: {},
    onlineGames: {
        name: 'Online',
        id: 'online',
        games: []
    },
    offlineGames: {
        name: 'Offline',
        id: 'offline',
        games: []
    },
};

export const store = createStore(AppReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    // listen for store changes
    console.log('===== store updated =====', store.getState())
});