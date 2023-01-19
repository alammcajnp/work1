import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const StorageKeys = {
    AccessToken: 'AccessToken',
    user: 'user',
    isCookieAccepted: 'isCookieAccepted'
};

export class StorageService {
    static get(key) {
        return sessionStorage.getItem(key);
    }
    static set(key, value) {
        sessionStorage.setItem(key, value);
    }
    static getObj(key) {
        try {
            const item = sessionStorage.getItem(key)
            return JSON.parse(item);
        } catch (e) {
            return null
        }
    }
    static setObj(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static getPerm(key) {
        let item = localStorage.getItem(key);
        try {
           return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }
    static setPerm(key, value) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    static delete(key) {
        sessionStorage.removeItem(key);
    }
    static clearAll() {
        sessionStorage.clear();
    }
}

export const CookieKeys = {
    AccessToken: 'AccessToken',
    RefreshToken: 'RefreshToken',
    User: 'User',
    Admin: 'Admin',
    IsCookieAccepted: 'isCookieAccepted'
};
export class CookieService {
    static get(key) {
        return cookies.get(key);
    }
    static set(key, value) {
        return cookies.set(key, value);
    }
    static remove(key) {
        return cookies.remove(key);
    }
}

export class TempStorage {
    static loggedInUser = {};
    static authToken = '';
}
