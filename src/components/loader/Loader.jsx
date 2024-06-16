import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader-container">
            <div id="loader-logo">
                <img src="https://images.typeform.com/images/LztDQu9MkiiN" alt="logo" />
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </div>
    )
};

export default Loader;
