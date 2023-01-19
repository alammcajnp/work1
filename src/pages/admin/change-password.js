import React, {useReducer, useState, useEffect} from 'react';
import Utils from "../../service/core/utils";
import AppInput from "../../components/$widgets/app-input/app-input";
import {useHistory, useParams} from "react-router-dom";
import PageTitle from "../../components/page-title";
import {connect} from "react-redux";
import {doChange} from "../../service/api/admin.service";
import Button from "../../components/$widgets/button";
import './styles.scss'
import AppTextEditor from "../../components/$widgets/app-input/app-text-editor";
import AppSwitch from "../../components/$widgets/app-switch/app-switch";
import AppTextArea from "../../components/$widgets/app-input/app-textarea";
import { toast, ToastContainer } from 'react-toastify';

const formState = {
    password: Utils.blankInput(),
    confirm_password: Utils.blankInput(),
};

function validateForm(form) {
    const {password, confirm_password} = form;
    let hasError = false;

    if (password.value === '') {
        password.error = 'Field is required';
        hasError = true;
    }
    if (confirm_password.value === '') {
        confirm_password.error = 'Field is required';
        hasError = true;
    }
    return {form, hasError};
}

const ChangePassword = ({dispatch}) => {

    const [form, dispatch1] = useReducer(Utils.formReducer(formState), formState);
    const history = useHistory();    
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch1({type: 'update-field', name, value});
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);
        dispatch1({ type: 'update-form', value: newFormState });        
        if (form.password.value !== form.confirm_password.value) {           
            toast.error("Password and confirm password must be same");
            return;
        }
        if (!hasError) {
            const password = {
                password: form.password.value
            }
            setLoading(true)
            let error;
            const { response } = await doChange(password);
            setLoading(false);
            if (error && error.result.status!=200) return
            dispatch1({type: 'reset'});
        } else {
            console.log(hasError);
            console.log("error");
        }
    };

    return (
        <div>
            <PageTitle className={'py-3'} title={"Change Password"}/>
            <section className="">
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="add-game-main col-12">
                            <form onSubmit={handleSubmit} className="form-contact" id="addgameform"
                                  data-aos="fade-right"
                                  data-aos-duration="800">

                                <AppInput type="text"
                                          label={'Password'}
                                          onChange={handleChange}
                                          field={form.password}
                                          onEnter={handleSubmit}
                                          name="password" id="password"
                                          placeholder="Password"/>
                                <AppInput
                                    label={'Confirm Password'}
                                    onChange={handleChange}
                                    field={form.confirm_password}
                                    onEnter={handleSubmit}
                                    type="text"
                                    name="confirm_password"
                                    id="confirm_password"
                                    placeholder="Confirm Password" />
                                
                                <Button title={'Change Password'}
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

export default connect()(ChangePassword);