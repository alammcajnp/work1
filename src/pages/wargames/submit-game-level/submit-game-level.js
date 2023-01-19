import React from 'react';
import './styles.scss'

const SubmitGameLevel = ({game, level}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={'submit-game-level-main'}>
            <form onSubmit={handleSubmit} id="subscribe-form">
                <input className={'text-white'} type="email" placeholder="Enter your answer" required="" id="subscribe-email" />
                <button className="tf-button-st2 btn-effect" type="submit" id="subscribe-button"> <span className="effect">Submit</span></button>
            </form>
        </div>
    );
};

export default SubmitGameLevel;