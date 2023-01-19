import axios from 'axios';
import {baseUrl, Urls} from "../../config/urls";
import {CookieKeys, CookieService} from './storage.service'
import {errorToast, successToast} from "./toast.service";
// import config from "tailwindcss/defaultConfig";
// import Action from "../../redux/action";
// import {store} from "../../redux/store";

export const HTTP = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': "Bearer "+token
    }
});

HTTP.interceptors.request.use(async (config) => {
    let accessToken = CookieService.get(CookieKeys.AccessToken)
    let refreshToken = CookieService.get(CookieKeys.RefreshToken)

    if (accessToken && /(login|signup|forget-password)/.test(config.url)) {
        return config;
    }
    if (accessToken && /(refresh-token)/.test(config.url)) {
        config.headers.authorization = 'Bearer ' + refreshToken;
    } else {
        config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
}, error => {
    return error;
});

HTTP.interceptors.response.use(async (response) => {
    const {title, description} = response.data;
    if (response.status === 200 && title) {
        successToast(title, description)
    }

    return {result: response};
}, e => {
    if (!e.response) {
        return errorToast("Server is down", "Please contact admin")
    }
    if (e.response.status === 400) {
        const {title, description} = e.response.data;
        errorToast(title, description)
    } else if (e.response.status === 401) {
        const {title, description, isExpired} = e.response.data;
        if (isExpired) {
            return refreshToken(e.response)
        } else {
            errorToast(title, description)
            logout()
        }
    } else if (e.response.status === 500) {
        errorToast("Internal Server Error", "Please contact admin")
    }
    return {
        error: e?.response || null
    };
});

async function refreshToken(args) {
    const response = await HTTP.get(Urls.refreshToken);
    const {error, result} = response;
    if (!error) {
        const {accessToken, refreshToken} = result.data;
        CookieService.set(CookieKeys.AccessToken, accessToken)
        CookieService.set(CookieKeys.RefreshToken, refreshToken)
        return callFailedAPIAgain(args)
    }
    return response;
}

async function callFailedAPIAgain(args) {
    const {url, method, data} = args.config;
    return await HTTP({url, method, data})
}

function logout() {
    CookieService.remove(CookieKeys.User)
    CookieService.remove(CookieKeys.AccessToken)
    // new Action({dispatch: store.dispatch}).updateUser(null)
    setTimeout(() => {
        // window.location.reload();
    }, 2000)
}