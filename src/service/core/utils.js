import moment from "moment";

export default class Utils {

    static getFormattedDate(date, withTime) {
        if (!date) {
            return ''
        }
        return withTime ?
            moment(date).format('MMM D YYYY, h:mm A') :
            moment(date).format('MMM D YYYY');
    }

    static getFirstLetters(user) {
        if (!user) return ''
        const parts = user.name.split(" ")
        const a = parts[0] ? parts[0].charAt(0) : '';
        const b = parts[1] ? parts[1].charAt(0) : '';
        return (a + b).toUpperCase();
    }

    static getFirstLastNames(fullName) {
        if (!fullName) return ''
        const parts = fullName.split(" ")
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ")
        return {firstName, lastName}
    }

    static blankInput(value = '', error = '') {
        return {value, error};
    }

    static parseQuery(query) {
        if (!query) return {};
        const search = query.substring(1);
        return JSON.parse('{"' + search
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + '"}',
            function (key, value) {
                return key === "" ? value : decodeURIComponent(value)
            })
    }

    static formReducer = (formState) => (state, action) => {
        let newState = {...state};
        const {type, name, value} = action;
        if (type === 'update-field') {
            newState[name] = {value, error: ''};
        } else if (type === 'update-form') {
            newState = {...value};
        } else if (type === 'reset') {
            newState = {...formState};
        }
        return newState;
    }
}
