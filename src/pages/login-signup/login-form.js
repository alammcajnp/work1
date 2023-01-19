import React, {useReducer, useState} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {Link, useHistory} from "react-router-dom";
import {doLogin} from "../../service/api/user.service";
import {connect} from "react-redux";
import Action from "../../redux/action";
import Button from "../../components/$widgets/button";

const formState = {
    email: Utils.blankInput(),
    password: Utils.blankInput(),
};

function validateForm(form) {
    const {email, password} = form;

    let hasError = false;
    if (email.value === '') {
        email.error = 'Field is required';
        hasError = true;
    }
    if (password.value === '') {
        password.error = 'Field is required';
        hasError = true;
    }

    return {form, hasError};
}

const LoginForm = ({dispatch}) => {
    const [form, dispatch1] = useReducer(Utils.formReducer(formState), formState);
    const [revealPassword, setRevealPassword] = useState(false);
    const history = useHistory()
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch1({type: 'update-field', name, value});
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);
        dispatch1({type: 'update-form', value: newFormState});

        if (!hasError) {
            const user = {
                email: form.email.value,
                password: form.password.value,
            }
            setLoading(true)
            const {result, error} = await doLogin(user)
            setLoading(false)
            if (error) return

            dispatch1({type: 'reset'});
            history.push(`/wargames`)
        }
    };

    const handleForgetPassword = async () => {
        history.push(`/forget-password`)
    }

    return (
        <form onSubmit={handleSubmit} className="form-contact" id="contactform"
              data-aos="fade-right"
              data-aos-duration="800">

            <AppInput type="email" onChange={handleChange}
                      field={form.email}
                      onEnter={handleSubmit}
                      name="email" id="email"
                      placeholder="Email Address"/>
            <AppInput revealEye={true}
                      onChange={handleChange}
                      field={form.password}
                      onEnter={handleSubmit}
                      handleReveal={setRevealPassword}
                      type={revealPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Password"/>

            <p className={'px-0 col-12 small'}>
                <span onClick={handleForgetPassword} className={'link2 text-pink1'}>Forget Password?</span>
            </p>
            <p className={'px-0 col-12 small'}>
                Don't have an account <Link className={'link2 text-pink1'}
                                            to={'/signup'}>Signup</Link> now.
            </p>

            <Button title={'Login'}
                    disabled={loading}
                    loading={loading}
                    className="mt-4"
                    type="submit" />
        </form>
    );
};

export default connect()(LoginForm);