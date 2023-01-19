import React, {useEffect, useReducer, useState} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {useHistory, useLocation} from "react-router-dom";
import {forgetPassword, resetPassword} from "../../service/api/user.service";
import Button from "../../components/$widgets/button";
import {CookieKeys, CookieService} from "../../service/core/storage.service";

const formState = {
    email: Utils.blankInput(), password: Utils.blankInput(), confirmPassword: Utils.blankInput(),
};

function validateForm(form, group) {
    const {email, confirmPassword, password} = form;

    let hasError = false;
    if (group === 'email') {
        if (email.value === '') {
            email.error = 'Field is required';
            hasError = true;
        }
    } else if (group === 'password') {
        if (confirmPassword.value === '') {
            confirmPassword.error = 'Field is required';
            hasError = true;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.error = 'Password and confirm password did not match';
            hasError = true;
        }
    }

    return {form, hasError};
}


const ForgetPassword = () => {
    const [form, dispatch] = useReducer(Utils.formReducer(formState), formState);
    const [revealPassword1, setRevealPassword1] = useState(false);
    const [revealPassword2, setRevealPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const query = Utils.parseQuery(location.search)
    const token = query?.token;
    const history = useHistory()

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch({type: 'update-field', name, value});
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!token) {
            return getResetLink()
        }

        const {form: newFormState, hasError} = validateForm(form, 'password');
        dispatch({type: 'update-form', value: newFormState, name: null});

        if (!hasError) {
            const body = {
                token,
                password: form.password.value,
            }
            setLoading(true)
            const {error} = await resetPassword(body)
            setLoading(false);

            if (!error) {
                dispatch({type: 'reset'});
                history.push(`/login`)
            }
        }
    };

    const getResetLink = async () => {
        const {form: newFormState, hasError} = validateForm(form, 'email');
        dispatch({type: 'update-form', value: newFormState, name: null});

        if (!hasError) {
            const body = {
                email: form.email.value,
            }
            setLoading(true)
            const {error} = await forgetPassword(body)
            setLoading(false);

            if (!error) {
                dispatch({type: 'reset'});
            }
        }
    }

    useEffect(() => {
        CookieService.set(CookieKeys.AccessToken, token);
    }, [])

    return (<form onSubmit={handleSubmit} className="form-contact" id="contactform"
                  data-aos="fade-right"
                  data-aos-duration="800">

        {!token
            ? <div>
                <AppInput type="email" onChange={handleChange}
                          field={form.email}
                          onEnter={handleSubmit}
                          disabled={loading}
                          name="email" id="email"
                          placeholder="Email Address"/>
            </div>
            : <div>
                <AppInput revealEye={true}
                          onChange={handleChange}
                          field={form.password}
                          onEnter={handleSubmit}
                          handleReveal={setRevealPassword1}
                          type={revealPassword1 ? 'text' : 'password'}
                          name="password"
                          disabled={loading}
                          id="password"
                          placeholder="Password"/>

                <AppInput revealEye={true}
                          onChange={handleChange}
                          field={form.confirmPassword}
                          onEnter={handleSubmit}
                          handleReveal={setRevealPassword2}
                          type={revealPassword2 ? 'text' : 'password'}
                          name="confirmPassword"
                          disabled={loading}
                          id="confirmPassword"
                          placeholder="Confirm Password"/>
            </div>}

        <Button title={token ? 'Reset Password' : 'Verify Email'}
                disabled={loading}
                loading={loading}
                className="mt-4" type="submit" />
    </form>);
};

export default ForgetPassword;