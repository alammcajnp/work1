import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import Action from "../../redux/action";

function ScrollToTop({dispatch}) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        new Action({dispatch}).updateWebLocation(location)
    }, [location.pathname]);

    return null;
}

const mapStateToProps = (state) => {
    return {
        device: state.device,
    }
}
export default connect()(ScrollToTop)