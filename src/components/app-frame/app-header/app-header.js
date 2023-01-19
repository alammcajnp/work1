import React, {Component} from 'react';
import './app-header.scss';
import {withRouter} from 'react-router-dom';
import {html} from "./app-header.html";
import {connect} from "react-redux";
import {CookieKeys, CookieService, StorageKeys, StorageService} from "../../../service/core/storage.service";
import Action from "../../../redux/action";
import AuthService from "../../../service/core/auth.service";

class AppHeader extends Component {

    state = {
        scroll: false,
        menuActive: null,
        activeIndex: null,
    }

    handleLogout = () => {
        CookieService.remove(CookieKeys.User)
        CookieService.remove(CookieKeys.AccessToken)
        new Action({context: this}).updateUser(null)
    }

    handleMenuActive = (close) => {
        if (close === true) {
            return this.setState({
                menuActive: null
            });
        }
        this.setState({
            menuActive: !this.state.menuActive
        });
    };

    handleDropdown = (index) => {
        this.setState({
            activeIndex: index
        });
    };

    componentDidMount() {
        window.addEventListener("scroll", () => {
            this.setState({
                scroll: window.scrollY > 108
            });
        });

        const user = AuthService.getUser();
        if (user && !this.props.user) {
            new Action({context: this}).updateUser(user);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.handleMenuActive(true)
        }
    }

    render = () => html.apply(this);
}

function mapStateToProps(state) {
    return {
        location: state.location,
        user: state.user,
    }
}

export default withRouter(connect(mapStateToProps)(AppHeader)) 
