import React, {useReducer, useState} from 'react';
import PageTitle from "../../components/page-title";
import Utils from "../../service/core/utils";
import {HTTP} from "../../service/core/http.service";
import {Urls} from "../../config/urls";
import {Link, useLocation} from "react-router-dom";
import SignupForm from "./signup-form";
import './styles.scss'
import LoginForm from "./login-form";
import ForgetPassword from "./forget-password";

const LoginSignup = () => {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/signup';
    return (
        <div>
            <PageTitle title={isLoginPage ? 'Login' : isSignupPage ? 'Signup' : 'Reset Password'} className={'py-3'}/>
            <section className="tf-contact">
                <div className="container-fluid px-0 py-sm-5">
                    <div className="row">
                        <div className="login-signup-main col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
                            {isLoginPage ? <LoginForm /> : isSignupPage ? <SignupForm/> : <ForgetPassword />}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginSignup;