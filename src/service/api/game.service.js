import {Urls} from "../../config/urls";
import {HTTP} from "../core/http.service";

export async function getGames() {
    return await HTTP.get(Urls.fetchGames) ;
}
