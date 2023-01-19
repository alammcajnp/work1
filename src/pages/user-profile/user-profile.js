import React, {useEffect, useReducer, useState} from 'react';
import PageTitle from "../../components/page-title";
import './user-profile.scss'
import HRLine from "../../components/horizontal-rule/hr-line";
import Utils from "../../service/core/utils";
import {updateProfile} from "../../service/api/user.service";
import AppInput from "../../components/$widgets/app-input/app-input";
import Button from "../../components/$widgets/button";
import AuthService from "../../service/core/auth.service";
import {CookieKeys, CookieService} from "../../service/core/storage.service";
import Action from "../../redux/action";
import {connect} from "react-redux";

const formState = {
    fullName: Utils.blankInput(),
    email: Utils.blankInput(),
    mobile: Utils.blankInput(),
    file: Utils.blankInput(),
};

function validateForm(form) {
    const {fullName, mobile} = form;

    let hasError = false;
    if (fullName.value === '') {
        fullName.error = 'Field is required';
        hasError = true;
    }
    if (mobile.value === '') {
        mobile.error = 'Field is required';
        hasError = true;
    }

    return {form, hasError};
}

const UserProfile = ({dispatch}) => {
    const [form, dispatchForm] = useReducer(Utils.formReducer({...formState}), formState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatchForm({type: 'update-field', name, value});
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const {form: newFormState, hasError} = validateForm(form);

        dispatchForm({ type: 'update-form', value: newFormState });   

        if (!hasError) {
            const user = {
                full_name: form.fullName.value,
                mobile: form.mobile.value,
                file:form.file.value
            }

    let formData = new FormData();
    formData.append('full_name', form.fullName.value);   //append the values with key, value pair
    formData.append('mobile', form.mobile.value);
    formData.append("file", e.target.file.files[0]);
            setLoading(true)
            const {result, error} = await updateProfile(formData)
            setLoading(false);

            if (!error) {
                new Action({dispatch}).updateUser(result.data.user)
            }
        }
    };

    useEffect(() => {
        const user = AuthService.getUser();
        if (user?.email) {
            const formState = {
                fullName: Utils.blankInput(user.full_name),
                email: Utils.blankInput(user.email),
                mobile: Utils.blankInput(user.mobile),
            };
            dispatchForm({type: 'update-form', value: formState});
        }
    }, [])

    return (
        <div className={'user-profile-main'}>
            <PageTitle title='User Profile' className={'py-3'}/>
            <section className="tf-contact">
                <div className="container-fluid px-0 py-sm-5">
                    <div className="row">
                        <div
                            className="login-signup-main col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">

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
                                          disabled={true}
                                          onEnter={handleSubmit}
                                          name="email" id="email"
                                          placeholder="Email Address"/>

                                <AppInput type="number" onChange={handleChange}
                                          field={form.mobile}
                                          onEnter={handleSubmit}
                                          name="mobile" id="mobile"
                                    placeholder="Phone" />
                                
                                <div>Upload</div>
                                <span><input type={'file'} name={'file'} id={'file'} field={form.file}
                                    onChange={handleChange} onEnter={handleChange} /></span>
                                

                                <Button title={'Update'}
                                        disabled={loading}
                                        loading={loading}
                                        className="mt-4"
                                        type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <HRLine color="white" height="1px" margin="100px"/>
        </div>
    );
};

export default connect()(UserProfile);