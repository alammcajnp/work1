import {CookieKeys, CookieService} from "./storage.service";


export default class AuthService {
    static isUserLoggedIn() {
        const loggedInUser = AuthService.getUser();
        return !!loggedInUser;
    }

    static getUser() {
        return CookieService.get(CookieKeys.User) || null
    }

    static isAdminLoggedIn() {
        const loggedInUser = AuthService.getAdmin();
        return !!loggedInUser;
    }

    static getAdmin() {
        return CookieService.get(CookieKeys.Admin) || null
    }
}