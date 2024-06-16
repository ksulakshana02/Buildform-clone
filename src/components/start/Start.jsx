import React, { useEffect, useRef } from 'react'
import useIsInViewport from '../../hooks/useIsInViewport';
import ButtonContainer from '../buttonContainer/ButtonContainer';
import user from "../../assets/user.svg";
import "./Start.css"

const Start = ({ updateNextPage }) => {
    const startRef = useRef(null);
    const isInViewport = useIsInViewport(startRef);

    useEffect(() => {
        if (isInViewport) {
            startRef.current.focus();
        }
    }, [isInViewport]);

    return (
        <div className="start-main">
            <div className="start-container" ref={startRef} tabIndex="0">
                <h1 className="start-title">
                    <strong>Launch your Data Career in Weeks, not Years</strong>
                </h1>
                <p className="start-description">
                    <span>What to expect:</span>
                    <br />
                    <span>- </span>
                    <strong>Short-answer</strong>
                    <span> questions & </span>
                    <strong>No</strong>
                    <span> cover letter</span>
                    <br />
                    <span>- Takes 4 mins on average</span>
                </p>
                <ButtonContainer
                    buttonText="Start Your Journey"
                    showPressEnter={true}
                    handleButtonClick={updateNextPage}
                />
                <span className="user-container">
                    <img src={user} alt="users" />
                    <label>‎ 20 people have filled this out</label>
                </span>
            </div>
            <div className="image-container">
                <img src="https://images.typeform.com/images/RpFYn8rh9zhf/image/default-firstframe.png" alt="Rated 4.8 on course report" />
            </div>
        </div>
    );
};

export default Start;

