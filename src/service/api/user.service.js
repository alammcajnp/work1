import {Urls} from "../../config/urls";
import {HTTP} from "../core/http.service";
import Utils from "../core/utils";
import {CookieKeys, CookieService} from "../core/storage.service";
import Action from "../../redux/action";
import {store} from "../../redux/store";


export async function verifyOtp(user) {
    const result = await HTTP.post(Urls.login, user);
    if (result.data) {
        return result.data;
    }
    return undefined;
}

export async function doLogin(user) {
    const response = await HTTP.post(Urls.login, user);
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

export async function postLoginSignup(result) {
    const {accessToken, refreshToken, user} = result.data;
    CookieService.set(CookieKeys.AccessToken, accessToken)
    CookieService.set(CookieKeys.RefreshToken, refreshToken)

    if (user) {
        const {firstName, lastName} = Utils.getFirstLastNames(user.full_name)
        user.first_name = firstName;
        user.last_name = lastName;
        CookieService.set(CookieKeys.User, user);
        new Action({dispatch: store.dispatch}).updateUser(user);
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
