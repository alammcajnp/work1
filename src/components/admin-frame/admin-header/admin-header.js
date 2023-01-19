import React, {Component} from 'react';
import './admin-header.scss';
import {withRouter} from 'react-router-dom';
import {html} from "./admin-header.html";
import {connect} from "react-redux";
import {CookieKeys, CookieService, StorageKeys, StorageService} from "../../../service/core/storage.service";
import Action from "../../../redux/action";
import AuthService from "../../../service/core/auth.service";

class AdminHeader extends Component {

    state = {
        scroll: false,
        menuActive: null,
        activeIndex: null,
    }

    handleLogout = () => {
        CookieService.remove(CookieKeys.Admin)
        CookieService.remove(CookieKeys.AccessToken)
        new Action({context: this}).updateAdmin(null)
        this.props.history.push('/admin/login')
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

        const admin = AuthService.getAdmin();
        if (admin && !this.props.admin) {
            new Action({context: this}).updateAdmin(admin);
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
        admin: state.admin,
    }
}

export default withRouter(connect(mapStateToProps)(AdminHeader))
