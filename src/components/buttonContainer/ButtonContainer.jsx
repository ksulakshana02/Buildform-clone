import React from 'react'
import BasicButton from './BasicButton';
import "./ButtonContainer.css";

const ButtonContainer = ({ buttonText, showPressEnter, handleButtonClick, showPressEnterText }) => {
    return (
        <div className="button-container">
            <BasicButton buttonText={buttonText} handleButtonClick={handleButtonClick} />
            {showPressEnter && (
                <span className="press-enter">
                    press <strong>{showPressEnterText} ↵</strong>
                </span>
            )}
        </div>
    );
};

export default ButtonContainer;
