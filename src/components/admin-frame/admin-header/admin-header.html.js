import React from 'react';
import './admin-header.scss';
import {Link, NavLink} from "react-router-dom";
import menus from './menus.json'
import Button from "../../$widgets/button";
import logo from '../../../assets/images/logo.png'
import HRLine from "../../horizontal-rule/hr-line";

export function html() {
    const {handleDropdown, handleMenuActive, handleLogout} = this;
    const {scroll, menuActive, activeIndex} = this.state;
    const {location, admin} = this.props;

    return (
        <header id="header_main" className={`header ${scroll ? 'is-fixed' : ''}`}>
            <div className="container-fluid">
                <div id="site-header-inner">
                    <div className="header__logo">
                        <NavLink className={'logo-box'} to="/">
                            <p className={'logo'}>OverTheWire <span className={'admin-text'}>Admin</span></p>
                            <p className={'slogan'}>
                                We're hackers, and we are good-looking. We are the 1%.
                            </p>

                        </NavLink>
                    </div>
                    <nav id="main-nav" className={`main-nav ${menuActive ? 'active' : ''}`}>
                        <ul id="menu-primary-menu" className="menu">

                            {admin && <>
                                <li className="d-lg-none menu-item read-only">
                                    <span className={'text-pink1 user-name'}>Admin</span>
                                    <span className={'small d-block login-item'}>{admin.email}</span>
                                </li>
                                <li className="d-lg-none menu-item">
                                    <Link to={'/admin/change-password'}>Change Password</Link>
                                </li>
                            </>}

                            {
                                menus.map((data, idx) => (
                                    <li key={idx} onClick={() => handleDropdown(idx)}
                                        className={`menu-item ${data.namesub ? 'menu-item-has-children' : ''} ${activeIndex === idx ? 'active' : ''}`}
                                    >
                                        <Link to={data.links || location.pathname || '/'}>{data.name}</Link>

                                        {
                                            data.namesub &&
                                            <ul className="sub-menu">
                                                {
                                                    data.namesub.map((submenu) => (
                                                        <li key={submenu.id} className="menu-item"><NavLink
                                                            to={submenu.links}>{submenu.sub}</NavLink></li>
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </li>
                                ))
                            }

                            {admin && <li className="d-lg-none menu-item " onClick={handleLogout}>
                                <span className={'login-item'}>Logout</span>
                            </li>}

                        </ul>
                    </nav>

                    {admin
                        ? <div className={'login-wrapper'}>
                            <i className="far fa-user user-icon"></i>
                            <i className="far fa-caret-down"></i>
                            <ul className="sub-menu">
                                <li className="inner">
                                    <li className="menu-item read-only">
                                        <span className={'text-pink1'}>Admin</span>
                                        <span className={'small d-block'}>{admin.email}</span>
                                    </li>
                                    <HRLine />
                                    <li className="menu-item">
                                        <Link to={'/admin/change-password'}>Change Password</Link>
                                    </li>
                                    <li className="menu-item" onClick={handleLogout}>
                                        Logout
                                    </li>
                                </li>
                            </ul>
                        </div>
                        : ''
                    }
                    <div className={`mobile-button ${menuActive ? 'active' : ''}`} onClick={handleMenuActive}>
                        <span></span></div>
                </div>
            </div>
        </header>
    );
}

