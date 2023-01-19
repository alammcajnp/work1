import React, {Component} from 'react';
import {BrowserRouter, HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AppFrame from "../app-frame/app-frame";
import Home from "../../pages/home/home";


export class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={<div>loading...</div>}>
                    <Router>
                        <Switch>
                            {/*** App Routes ***/}
                            <AppRoute exact path='/home' component={Home}/>

                            <AppRoute exact path='*'>
                                <Redirect to={`/`} />
                            </AppRoute>

                        </Switch>
                    </Router>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

const AppRoute = ({...rest}) => (
    <AppFrame><Route
            {...rest}
        />
    </AppFrame>
);

