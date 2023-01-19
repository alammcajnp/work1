import {Urls} from "../../config/urls";
import {HTTP} from "../core/http.service";
import Utils from "../core/utils";
import {CookieKeys, CookieService} from "../core/storage.service";
import Action from "../../redux/action";
import {store} from "../../redux/store";

export async function doChange(password) {
    let admin = CookieService.get('Admin');
    let id = admin._id;
    const result = await HTTP.put(Urls.AdminChangePassword+'?id='+id, password) ;
    return result;
}

export async function verifyOtp(user) {
    const result = await HTTP.post(Urls.login, user);
    if (result.data) {
        return result.data;
    }
    return undefined;
} 
export async function AllUser() {
    const response = await HTTP.get(Urls.AllUser);
    return response;
}

export async function addGame(game) {
    const response = await HTTP.post(Urls.addGame, game);
    return response;
}

export async function addLevel(level) {
    const response = await HTTP.post(Urls.addLevel, level);
    return response;
}

export async function getGameById(id) {
    const response = await HTTP.get(Urls.getGameById+'/'+id);
    const { result } = response;
    return result;
}


export async function getLevelById(id) {
    const response = await HTTP.get(Urls.getLevelById+'/'+id);
    const { result } = response;
    return result;
}

export async function deleteLevel(id) {
    const response = await HTTP.delete(Urls.deleteLevel+'?levelID='+id);
    const { result } = response;
    return result;
} 

export async function deleteGame(id) {
    const response = await HTTP.delete(Urls.deleteGame+'?gameID='+id);
    return response;
} 

export async function AllLevels() {
    const response = await HTTP.get(Urls.getAllLevels);
    const { result } = response;
    return result;
}

export async function AllGames() {
    const response = await HTTP.get(Urls.allGames);
    const { result } = response;
    return result;
}

export async function doAdminLogin(user) {
    const response = await HTTP.post(Urls.adminLogin, user);
    const {error, result} = response;
    if (!error) {
        postLoginSignup(result)
    }
    return response;
}

export async function signup(user) {
    const response = await HTTP.post(Urls.signup, user);
    const {error, result} = response;
    if (!error) {
        postLoginSignup(result)
    }
    return response;
} 

export async function updateProfile(user) {
    const response = await HTTP.put(Urls.updateProfile, user);
    const {error, result} = response;
    if (!error) {
        CookieService.set(CookieKeys.User, result.data.user);
    }
    return response;
}

export async function updateGame(data, id) {
    const response = await HTTP.put(Urls.updateGame+'?gameID='+id, data);
    const {error, result} = response;
    return response;
}

export async function   updateLevel(data, id) {
    const response = await HTTP.put(Urls.updateLevel+'?levelID='+id, data);
    const {error, result} = response;
    return response;
}

export async function postLoginSignup(result) {
    const {accessToken, refreshToken, admin} = result.data;
    CookieService.set(CookieKeys.AccessToken, accessToken)
    CookieService.set(CookieKeys.RefreshToken, refreshToken)

    if (admin) {
        CookieService.set(CookieKeys.Admin, admin);
        new Action({dispatch: store.dispatch}).updateAdmin(admin);
    }
}

export async function blockUser(params) {
    const result = await HTTP.post(`${Urls.blockUser}`, params);
    if (result) {
        return result.data;
    }
    return undefined;
}

export async function getUsers(params) {
    const query = Utils.getUrlParamString(params, true)
    const result = await HTTP.get(`${Urls.userList}${query}`);
    if (result) {
        return result.data?.result;
    }
    return undefined;
}

export async function forgetPassword(data) {
    return await HTTP.post(Urls.forgetPassword, data)
}

export async function resetPassword(data) {
    return await HTTP.put(Urls.resetPassword, data)
}