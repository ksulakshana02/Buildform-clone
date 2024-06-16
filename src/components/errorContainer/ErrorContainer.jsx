import React from 'react'
import alertSvg from "../../assets/alert.svg"
import "./ErrorContainer.css"

export const ErrorContainer = ({ error }) => {
    return (
        <div className="error-container">
            <img src={alertSvg} alt="alert" className="alert" />
            <span className="error-text">{error}</span>
        </div>
    );
};
