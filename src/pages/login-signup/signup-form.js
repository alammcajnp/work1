import React, {useReducer, useState} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {Link, useHistory, useLocation} from "react-router-dom";
import {signup} from "../../service/api/user.service";
import Button from "../../components/$widgets/button";

const formState = {
    fullName: Utils.blankInput(),
    email: Utils.blankInput(),
    password: Utils.blankInput(),
    mobile: Utils.blankInput()
};

function validateForm(form) {
    const {fullName, email, password, mobile} = form;

    let hasError = false;
    if (fullName.value === '') {
        fullName.error = 'Field is required';
        hasError = true;
    }
    if (email.value === '') {
        email.error = 'Field is required';
        hasError = true;
    }
    if (mobile.value === '') {
        mobile.error = 'Field is required';
        hasError = true;
    }
    if (password.value === '') {
        password.error = 'Field is required';
        hasError = true;
    }

    return {form, hasError};
}


const SignupForm = () => {
    const [form, dispatchForm] = useReducer(Utils.formReducer(formState), formState);
    const [revealPassword, setRevealPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatchForm({type: 'update-field', name, value});
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);

        dispatchForm({type: 'update-form', value: newFormState});

        if (!hasError) {
            const user = {
                full_name: form.fullName.value,
                email: form.email.value,
                mobile: form.mobile.value,
                password: form.password.value,
            }
            setLoading(true)
            const {error} = await signup(user)
            setLoading(false);
            if (error) return

            dispatchForm({type: 'reset'});
            history.push(`/login`)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-contact" id="contactform"
              data-aos="fade-right"
              data-aos-duration="800">

            <AppInput type="text"
                      onChange={handleChange}
                      field={form.fullName}
                      onEnter={handleSubmit}
                      name="fullName"
                      id="fullName"
                      placeholder="Full Name"/>
            <AppInput type="email" onChange={handleChange}
                      field={form.email}
                      onEnter={handleSubmit}
                      name="email" id="email"
                      placeholder="Email Address"/>
            <AppInput type="number" onChange={handleChange}
                      field={form.mobile}
                      onEnter={handleSubmit}
                      name="mobile" id="mobile"
                      placeholder="Phone"/>
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
                <Link className={'link2 text-pink1'}
                      to={'/forget-password'}>Forget Password?</Link>
            </p>
            <p className={'px-0 col-12 small'}>
                Already have an account <Link className={'link2 text-pink1'}
                                            to={'/login'}>Login</Link>
            </p>

            <Button title={'Signup'}
                    disabled={loading}
                    loading={loading}
                    className="mt-4"
                    type="submit" />
        </form>
    );
};

export default SignupForm;