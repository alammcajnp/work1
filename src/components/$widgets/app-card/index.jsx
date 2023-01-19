import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

AppCard.propTypes = {
    item: PropTypes.object,
};

function AppCard(props) {

    const {item} = props;

    return (
        <div className="img-box">
            <img src={item.img} alt="cybox" />
            <div className="content">
                <p className={'title'}>{item.title}</p>
                {item.subTitle && <p className={'text-pink1'}>{item.subTitle}</p>}
            </div>
        </div>
    );
}

export default AppCard;