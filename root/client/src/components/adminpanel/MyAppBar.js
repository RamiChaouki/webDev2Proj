// in src/MyAppBar.js
import * as React from 'react';

// import Logo from './Logo';

import { defaultTheme, Layout, AppBar, ToggleThemeButton } from 'react-admin';
import { createTheme, Box, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import './MyAppBar.css';

const darkTheme = createTheme({
    palette: { mode: 'dark' },
});



const MyAppBar = function (props)  {

    const navigate = useNavigate();
    const navigateToLogout = () => {
        navigate('/Logout');
    };

    return (
    <AppBar
        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        }}
        {...props}
    >
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
            <button id='btnLogout' onClick={navigateToLogout}>Logout <i className="fa fa-sign-out"></i></button>
        </Box>
        {/* <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            id="react-admin-title"
        /> */}
        {/* <Logo /> */}
        {/* <span className={classes.spacer} /> */}
        <ToggleThemeButton
            lightTheme={defaultTheme}
            darkTheme={darkTheme}
        />
    </AppBar>
    )
};
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;
export default MyAppBar;