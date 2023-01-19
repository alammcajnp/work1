import React, {Component} from 'react';
import './app-frame.scss';
import AppHeader from "./app-header/app-header";
import AppFooter from "./app-footer/app-footer";
import {connect} from 'react-redux';
import Action from "../../redux/action";
import {AppImage} from '../$widgets/app-image/app-image';
import ScrollToTop from "../scroll-to-top/scroll-to-top";

class AppFrame extends Component {

    state = {
        isOpen: false
    }

    handleOpen = (isOpen) => {
        this.setState({isOpen})
    }

    handleWindowResize = () => {
        const device = {
            width: document.documentElement.clientWidth,
            scale: 0,
            breakpoint: 'xs'
        }
        if (device.width > 1024) {
            device.scale = 3;
            device.breakpoint = 'lg';
        } else if (device.width > 768) {
            device.scale = 2;
            device.breakpoint = 'md';
        } else if (device.width > 600) {
            device.scale = 1;
            device.breakpoint = 'sm';
        } else {
            device.scale = 0;
            device.breakpoint = 'xs';
        }
        new Action({context: this}).updateDevice(device)
    };

    componentDidMount = () => {
        // this.handleWindowResize();
        // window.addEventListener('resize', this.handleWindowResize);
    }

    render() {
        return (
            <div className={'app-frame-main'}>
                {/* <ScrollToTop />
                <AppHeader/> */}
                <main>
                    <div className="main-wrapper">
                        {this.props.children}
                    </div>

                    {/* <AppFooter/> */}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        device: state.device,
    }
}

export default connect(mapStateToProps)(AppFrame);
