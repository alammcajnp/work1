import React, {useEffect, useReducer, useState} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {useHistory} from "react-router-dom";
import {doAdminLogin} from "../../service/api/admin.service";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import Button from "../../components/$widgets/button";
import AuthService from "../../service/core/auth.service";

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

const AdminLogin = ({admin}) => {
    const [form, dispatchForm] = useReducer(Utils.formReducer(formState), formState);
    const [revealPassword, setRevealPassword] = useState(false);
    const history = useHistory()
    const [loading, setLoading] = useState(false);

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
                email: form.email.value,
                password: form.password.value,
            }
            setLoading(true)
            const { error } = await doAdminLogin(user);
            console.log(error);
            setLoading(false)

            if (error) return
            dispatchForm({type: 'reset'});
            history.push(`/admin/games`)
        }
    };

    useEffect(() => {
        if (AuthService.isAdminLoggedIn()) {
            history.replace(`/admin/games`)
        }
    }, [admin])

    return (
        <div>
            <PageTitle title={'Admin Login'} className={'py-3'}/>
            <section className="tf-contact">
                <div className="container-fluid px-0 py-sm-5">
                    <div className="row">
                        <div
                            className="login-signup-main col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
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

                                <Button title={'Login'}
                                        disabled={loading}
                                        loading={loading}
                                        className="mt-4"
                                        type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
};


function mapStateToProps(state) {
    return {
        admin: state.admin,
    }
}

export default connect(mapStateToProps)(AdminLogin);