import React from 'react';
import Button from "@mui/material/Button";

const BasicButton = ({ buttonText, handleButtonClick }) => {
  return (
    <Button variant="contained" onClick={handleButtonClick} style={{ backgroundColor: "#CB9EF8", fontFamily: 'sans-serif', fontSize: "16px", fontWeight: 700, outlineColor: "#FFFFFF" }}>{buttonText}</Button>
  )
}

export default BasicButton;
