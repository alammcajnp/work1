import AppReducer from './app.reducer';
import GamesReducer from "./games.reducer";
import {combineReducers} from "redux";

export default combineReducers({
    AppReducer,
    GamesReducer
})
