import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './root.scss';
import '../../assets/font/font-awesome.css'
import '../../scss/components/section.scss';
import '../../scss/components/box.scss';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppRouter} from "../app-router/app-router";
import {Config} from "../../config/config";
import AOS from 'aos';
import ErrorBoundaries from "../error-boundaries/error-boundaries";
import {store} from "../../redux/store";

if (Config.ENVIRONMENT === "development") {
    // stopReportingRuntimeErrors(); // disables error overlays
}

// let user = cookies.get('user')

function Root() {
    useEffect(() => {
        AOS.init({
            duration : 2000
        });
    }, []);

    return (
        <Provider store={store}>
            <ErrorBoundaries>
                <AppRouter/>
                <ToastContainer hideProgressBar={true}
                                autoClose={5000}
                                newestOnTop={true}/>
            </ErrorBoundaries>
        </Provider>
    );
}

export default Root;
